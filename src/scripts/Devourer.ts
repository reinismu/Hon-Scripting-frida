import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, Console, IHeroEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector2d } from "../utils/Vector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { tryUseAllItems } from "./Items";
import { IllustionController } from "../logics/IllusionController";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";

export class Devourer extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private justCasted = new DelayedCondition();
    private hook = new StoppableLineSpell(this.justCasted);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const range = q.getDynamicRange() + 20;
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(range);
        if (!enemyHero) {
            return;
        }
        this.hook.cast(
            q,
            0,
            this.myHero,
            enemyHero,
            1600,
            35,
            (spell: IEntityAbility, caster: IUnitEntity, target: IUnitEntity, castPos: Vec2) => {
                const hookRange = spell.getDynamicRange() + 20;
                const hookRadius = 75;

                const heroes = OBJECT_MANAGER.heroes as IUnitEntity[];
                const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
                const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];

                const collisionEntities = heroes
                    .filter((h) => !h.isEnemy(this.myHero))
                    .concat(creeps, neutrals)
                    .filter((u) => !u.isDead() && u.position.distance2dSqr(caster.position) < hookRange * hookRange);

                if (Vector2d.distance(castPos, caster.position) > hookRange) {
                    return false;
                }
                const startPos = caster.position;
                if (
                    collisionEntities.some(
                        (u) =>
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

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(300);
        if (!enemyHero) {
            if (this.myHero.hasTool("State_Devourer_Ability2_Self")) {
                this.justCasted.delay(250);
                ACTION.castSpell2(this.myHero, 1);
            }
            return;
        }

        if (!this.myHero.hasTool("State_Devourer_Ability2_Self")) {
            this.justCasted.delay(250);
            ACTION.castSpell2(this.myHero, 1);
        }
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(r.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(850);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control();

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`myHero: ` + OBJECT_MANAGER.myHero.ptr);

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
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} field_10C: ` + h.field_10C);
        //     console.log(`${h.typeName} boundingRadius: ` + h.boundingRadius);
        //     console.log(`${h.typeName} field_114: ` + h.field_114);
        // });
        // OBJECT_MANAGER.creeps.forEach(h => {
        //     console.log(`creep:${h.typeName} ${h.boundingRadius}`);
        // });
        this.doWLogic();
        if (this.myHero.hasTool("State_Devourer_Ability4_ControlGrowth")) {
            return;
        }
        tryUseAllItems(this.myHero, this.justCasted);
        this.doRLogic();
        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
        this.doQLogic();
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }

    // @Subscribe("DrawEvent")
    // onDraw() {
    //     const getVelPos = (target: IHeroEntity, delayMS: number) => {
    //         const eneVelocity = VELOCITY_UPDATER.getVelocity(target);
    //         if (eneVelocity.x == 0 && eneVelocity.y == 0) {
    //             return target.position;
    //         }

    //         const turnMs = 0; // source.getMsToTurnToPos(target.position);
    //         const enemyPositionAfterDelay = Vector2d.add(target.position, Vector2d.mul(eneVelocity, (delayMS + turnMs) / 1000));
    //         return enemyPositionAfterDelay;
    //     };

    //     // console.log("draw");
    //     OBJECT_MANAGER.heroes.forEach((h) => {
    //         if (!h.isIllusion()) {
    //             const pos = getVelPos(h, 1000);
    //             const screenPos = CLIENT.worldToScreen({x: pos.x, y: pos.y, z: h.position.z});
    //             GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
    //         }
    //     });
    // }

    @Subscribe("RequestStartAnimEvent")
    onAnimationStart(args: NativePointer[]) {
        // Dont update state if we are shooting
        // console.log(`RequestStartAnimEvent: ${args[1]} ${args[1].read32BitString()}`);
    }
}
