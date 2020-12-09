import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "./TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "./Items";
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction } from "./Prediction";

export class Moraxus extends Script {
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
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpell2(this.myHero, 0);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(e.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        const castLocation = opPrediction(this.myHero, enemyHero, 1200, 100, e.getDynamicRange() - 50, 20);
        if (!castLocation) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellPosition(this.myHero, 2, castLocation.x, castLocation.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 2);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;

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

        tryUseAllItems(this.myHero, this.justCasted);

        if (this.orbwalker.canMove.isTrue()) {
            // this.doQLogic();
            this.doELogic();
            // this.doWLogic();
        }

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     // if (!INPUT.isControlDown()) return;

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
