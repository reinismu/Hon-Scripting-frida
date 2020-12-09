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

export class Tarot extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(
            q.getDynamicRange(),
            this.myHero.position,
            (h) => h.getAllAlliesInRange(450).length !== 0
        );
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyProxyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.myHero.getAttackRange() + 50);
        if (!enemyProxyHero) {
            return;
        }

        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(
            w.getDynamicRange(),
            this.myHero.position,
            (h) => !h.isMagicImmune() && h !== enemyProxyHero && Vector2d.distance(h.position, enemyProxyHero.position) < 800
        );
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }

        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(
            e.getDynamicRange(),
            this.myHero,
            (h) => h.getAlliesInRange(400).length !== 0
        );
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellEntity(this.myHero, 2, enemyHero);
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

        this.doQLogic();
        this.doWLogic();
        this.doELogic();
        // this.doWLogic();

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
