import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { IllustionController } from "../logics/IllusionController";
import { tryUseAllItems } from "../logics/Items";
import { tryEvade } from "../logics/Evade";
import { findBestCircularCast } from "../utils/BestCircularLocation";

export class GraveKeeper extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 30);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(50);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        const range = w.getDynamicRange();
        if (!w.canActivate()) {
            return;
        }

        const enemies = this.myHero.getEnemiesInRange(range + 400);
        if (enemies.length < 4) {
            return;
        }
        const pos = findBestCircularCast(this.myHero, range, 350, 200, enemies, 100, 2);
        if (!pos) {
            return;
        }

        this.justCasted.delay(450);
        ACTION.castSpellPosition(this.myHero, 1, pos.x, pos.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 12);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        tryEvade(this.myHero, this.orbwalker, this.justCasted);
        tryUseAllItems(this.myHero, this.justCasted);

        if (!INPUT.isControlDown()) return;

        // const facingAngle = this.myHero.facingAngle;
        // console.log(`getAttackReadyValue1 ${this.myHero.getAttackReadyValue1()}`);
        // console.log(`field_76C ${this.myHero.field_76C}`);

        // console.log(`heroPtrs ${this.myHero.ptr.add(0x6b0)}`);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        if (this.orbwalker.canMove.isTrue()) {
            this.doQLogic();
            this.doWLogic();
        }


        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    // @Subscribe("DrawEvent")
    // onDraw() {
    //     // OBJECT_MANAGER.buildings.forEach((h) => {
    //     //     const drawVec = CLIENT.worldToScreen(h.position);
    //     //     if (!h.isEnemy(this.myHero)) {
    //     //         GRAPHICS.drawRect(drawVec.x, drawVec.y, 8, 8);
    //     //     }
    //     // });
    //     const h = this.myBase;
    //     const drawVec = CLIENT.worldToScreen(h.position);
    //     // if (!this.orbwalker.canAttack.isTrue(280) && this.orbwalker.canMove.isTrue()) {
    //         GRAPHICS.drawRect(drawVec.x, drawVec.y, 80, 80);
    //     // }
    // }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // Delay automatic actions if manual was preformed
        this.justCasted.delay(100);
    }
}
