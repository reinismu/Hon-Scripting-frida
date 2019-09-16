import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, Console } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector2d } from "../utils/Vector";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";

export class Devourer extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private justCasted = new DelayedCondition();
    private hook = new StoppableLineSpell(this.justCasted);

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
                this.justCasted.delay(150);
                ACTION.castSpell2(this.myHero, 1);
            }
            return;
        }

        if (!this.myHero.hasTool("State_Devourer_Ability2_Self")) {
            this.justCasted.delay(150);
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(r.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(450);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
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
