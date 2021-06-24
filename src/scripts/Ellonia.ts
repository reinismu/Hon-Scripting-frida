import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction, opPredictionCircular } from "../utils/Prediction";
import { findBestCircularCast } from "../utils/BestCircularLocation";

export class Ellonia extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        const castLocation = opPrediction(this.myHero, enemyHero, 1100, 150, q.getDynamicRange(), 30);
        if (!castLocation) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellPosition(this.myHero, 0, castLocation.x, castLocation.y);
    }

    doWLogic() {
        const q = this.myHero.getTool(1) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 100);
        if (!enemyHero) {
            return;
        }

        const targetPos = opPredictionCircular(this.myHero, enemyHero, 150, q.getDynamicRange(), 150);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 1, targetPos.x, targetPos.y);
    }

    doWLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 250;

        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(w.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemyHeroes.length === 0) {
            return;
        }
        const lowestHpPercent = enemyHeroes.map((h) => h.getHealthPercent()).sort((a, b) => a - b)[0];
        if (enemyHeroes.length === 1 || lowestHpPercent < 30) {
            this.doQLogic();
            return;
        }
        const bestloc = findBestCircularCast(this.myHero, w.getDynamicRange(), radius, 200, enemyHeroes);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 1, bestloc.x, bestloc.y);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(e.getDynamicRange(), OBJECT_MANAGER.myHero, (h) =>
            h.hasTool("State_Ellonia_Ability3")
        );
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellEntity(this.myHero, 2, enemyHero);
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 350;
        const range = 600;

        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(range)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemyHeroes.length === 0) {
            return;
        }
        const bestloc = findBestCircularCast(this.myHero, range, radius, 600, enemyHeroes, 40, 3);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(350);
        ACTION.castSpellPosition(this.myHero, 3, bestloc.x, bestloc.y);
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

        tryUseAllItems(this.myHero, this.justCasted);
        if (!INPUT.isControlDown()) return;

        // OBJECT_MANAGER.heroes.forEach((h) => {
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
            this.doRLogic();
            this.doQLogic();
            this.doWLogic();
            this.doELogic();
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
