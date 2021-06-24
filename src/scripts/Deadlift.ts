import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IHeroEntity, IFileChangeCallback, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { getTroublePoints, TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableCircularSpell } from "../utils/StoppableCircularSpell";
import { tryUseAllItems } from "../logics/Items";
import { findBestCircularCast } from "../utils/BestCircularLocation";
import { GRAPHICS } from "../graphics/Graphics";

export class Deadlift extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 350;

        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHeros = OBJECT_MANAGER.heroes.filter(
            (h) =>
                h.health > 0 &&
                h.isEnemy(this.myHero) &&
                h.position.distance2d(this.myHero.position) < q.getDynamicRange() + radius
        );

        if (enemyHeros.length === 0) {
            return;
        }
        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, 300, enemyHeros);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
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
        tryUseAllItems(this.myHero, this.justCasted);

        if (!INPUT.isControlDown()) return;

        // const spell = this.myHero.getTool(0) as IEntityAbility;
        // console.log(`typeName:` + this.myHero.typeName);
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`getRDamage:` + this.getRDamage());
        // console.log(`getDynamicRange:` + spell.getDynamicRange());
        // console.log(`getAdjustedActionTime:` +  spell.getAdjustedActionTime());
        // console.log(`getAdjustedAttackActionTime:` +  OBJECT_MANAGER.myHero.getAdjustedAttackActionTime());
        // console.log(`getAdjustedAttackDuration:` +  OBJECT_MANAGER.myHero.getAdjustedAttackDuration());
        // // console.log(`getCanAttack:` +  OBJECT_MANAGER.myHero.getCanAttack());
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // this.doWLogic();
        // const r = this.myHero.getTool(3) as IEntityAbility;
        // console.log("r.isToggled", r.isToggled);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        if (this.orbwalker.canMove.isTrue()) {
            this.doQLogic();
        }

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
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
    //     // console.log("draw");
    //     const enemyHeros = OBJECT_MANAGER.heroes.filter(
    //         (h) =>
    //             h.health > 0 &&
    //             h.isEnemy(this.myHero) &&
    //             h.position.distance2d(this.myHero.position) < 500 + 350
    //     );

    //     if (enemyHeros.length === 0) {
    //         return;
    //     }
    //     const bestloc = findBestCircularCast(this.myHero, 500, 350, 300, enemyHeros);
    //     if (!bestloc) {
    //         return;
    //     }

    //     const screenPos = CLIENT.worldToScreen({ ...bestloc, z: this.myHero.position.z });
    //     GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
    // }
}
