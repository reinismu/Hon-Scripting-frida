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
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";

export class Kinesis extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    // HOOK stuff
    private canNotStop = new DelayedCondition();
    private hookCastPosition: Vec2 | null = null;
    private hookTarget: IUnitEntity | null = null;
    private hookTargetAnimationIndex = 0;
    private turnToTargetDelay: number = 0;
    private canStopCheck = new DelayedCondition();

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
        if (!this.justCastedR.isTrue() || !this.justCastedR.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if (this.myHero.hasTool("State_Kenisis_Ability4_Modifier")) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(r.getDynamicRange() + 20);
        if (!enemyHero || enemyHero.getHealthPercent() < 25) {
            return;
        }

        this.justCastedR.delay(1000);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    doSilenceLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const silence = this.myHero.getItem("Item_Silence");
        if (!silence) {
            return;
        }
        if (!silence.item.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(silence.item.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(150);
        ACTION.castSpellEntity(this.myHero, silence.index, enemyHero);
    }

    doShrunkensLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const shrunken = this.myHero.getItem("Item_Immunity");
        if (!shrunken) {
            return;
        }
        if (!shrunken.item.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero || Vector2d.distance(enemyHero.position, this.myHero.position) > 550) {
            return;
        }

        this.justCasted.delay(150);
        ACTION.castSpell2(this.myHero, shrunken.index);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
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
        this.doSilenceLogic();
        this.doShrunkensLogic();
        this.doQLogic();
        this.doWLogic();
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
