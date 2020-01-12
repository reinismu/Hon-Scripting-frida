import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity, Console } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector, Vector2d } from "../utils/Vector";
import { shitPrediction, goodPrediction, opPrediction } from "./Prediction";
import { RESOURCE_MANAGER } from "../objects/ResourceManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { doSheepstickLogic, tryUseAllItems } from "./Items";

export class Kinesis extends Script {
    private orbwalker = new Orbwalker(this.myHero);

    private justCasted = new DelayedCondition();

    private hook = new StoppableLineSpell(this.justCasted);
    private justCastedR = new DelayedCondition();

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    // Check for 3 weakest heroes
    doDevourerQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const range = q.getDynamicRange() + 20;
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(range);
        if (!enemyHero) {
            return;
        }
        this.hook.cast(
            q,
            0,
            this.myHero,
            enemyHero,
            1600,
            55,
            (spell: IEntityAbility, caster: IUnitEntity, target: IUnitEntity, castPos: Vec2) => {
                const hookRange = spell.getDynamicRange() + 20;
                const hookRadius = 75;

                const heroes = OBJECT_MANAGER.heroes as IUnitEntity[];
                const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
                const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];

                const collisionEntities = heroes
                    .filter(h => !h.isEnemy(this.myHero))
                    .concat(creeps, neutrals)
                    .filter(u => !u.isDead() && u.position.distance2dSqr(caster.position) < hookRange * hookRange);

                if (Vector2d.distance(castPos, caster.position) > hookRange) {
                    return false;
                }
                const startPos = caster.position;
                if (
                    collisionEntities.some(
                        u =>
                            !u.ptr.equals(caster.ptr) &&
                            !u.ptr.equals(target.ptr) &&
                            Vector2d.distToSegmentSquared(u.position, startPos, castPos) <
                                (hookRadius + u.boundingRadius) * (hookRadius + u.boundingRadius)
                    )
                ) {
                    return false;
                }
                return true;
            }
        );
    }

    private doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        if (q.typeName == "Ability_Devourer1") {
            this.doDevourerQLogic();
            return;
        } else if (q.typeName == "Ability_Kenisis1") {
            if (!this.justCasted.isTrue()) {
                return;
            }
            const dev = OBJECT_MANAGER.heroes.find(
                h => h.isEnemy(this.myHero) && 
                    (h.typeName == "Hero_Devourer" || h.typeName == "Hero_Kunas") &&
                    !h.isMagicImmune() &&
                    Vector2d.distance(h.position, this.myHero.position) + 20 < q.getDynamicRange()
            );
            if (dev) {
                this.justCasted.delay(80);
                ACTION.castSpellEntity(this.myHero, 0, dev);
                return;
            }
        } else if (q.typeName == "Ability_Kunas1") {
            if (!this.justCasted.isTrue()) {
                return;
            }
            const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 20);
            if (!enemyHero) {
                return;
            }
            this.justCasted.delay(150);
            ACTION.castSpellEntity(this.myHero, 0, enemyHero);
        }
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(620);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(80);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doRLogic() {
        if (!this.justCasted.isTrue() || !this.justCastedR.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if (this.myHero.hasTool("State_Kenisis_Ability4_Modifier")) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(r.getDynamicRange() + 20);
        if (!enemyHero || enemyHero.getHealthPercent() < 25 || enemyHero.isDisabled()) {
            return;
        }

        this.justCasted.delay(250);
        this.justCastedR.delay(1000);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }
    

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }
    
        if (!INPUT.isControlDown() || this.myHero.isDead()) return;

        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);

        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`myHero: ` + OBJECT_MANAGER.myHero.ptr);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} getCurrentAnimIndex: ` + h.skeleton.getCurrentAnimIndex());
        // });
        // OBJECT_MANAGER.creeps.forEach(h => {
        //     console.log(`creep:${h.typeName} ${h.boundingRadius}`);
        // });
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        this.doRLogic();
        tryUseAllItems(this.myHero, this.justCasted);
        this.doWLogic();
        this.doQLogic();

        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // console.log("draw");
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     if (h.isIllusion()) {
        //         const screenPos = CLIENT.worldToScreen(h.position);
        //         GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
        //     }
        // });
    }

    @Subscribe("RequestStartAnimEvent")
    onAnimationStart(args: NativePointer[]) {
        // Dont update state if we are shooting
        // console.log(`RequestStartAnimEvent: ${args[1]} ${args[1].read32BitString()}`);
    }
}
