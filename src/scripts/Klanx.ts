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
import { opPrediction } from "../utils/Prediction";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { tryEvade } from "../logics/Evade";
import { findBestCircularCast, findBestCircularProjectileCast } from "../utils/BestCircularLocation";

export class Klanx extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 100);
        if (!enemyHero) {
            return;
        }

        const turnTime = this.myHero.getMsToTurnToPos(enemyHero.position);
        const targetPos = opPrediction(this.myHero.position, enemyHero, 999999999, 1000 + turnTime, q.getDynamicRange(), 200);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(150);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
    }

    doQLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 300;

        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(q.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemyHeroes.length === 0) {
            return;
        }
        const lowestHpPercent = enemyHeroes.map((h) => h.getHealthPercent()).sort((a, b) => a - b)[0];
        if (lowestHpPercent < 30) {
            this.doQLogic();
            return;
        }

        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, 1200, enemyHeroes, 40, 2);
        if (!bestloc) {
            this.doQLogic();
            return;
        }

        const turnTime = this.myHero.getMsToTurnToPos(bestloc);
        this.justCasted.delay(150 + turnTime);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
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

        tryEvade(this.myHero, this.orbwalker, this.justCasted);
        tryUseAllItems(this.myHero, this.justCasted);
        if (!INPUT.isControlDown()) return;

        this.doQLogicSpam();

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
    @Subscribe("DrawEvent")
    onDraw() {
        // const screenpos = CLIENT.worldToScreen(this.myHero.position);
        // const screenpos2 = CLIENT.worldToScreen(IGAME.mysteriousStruct.mousePosition);
        // // GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);

        // for (let i = 0; i < 80; i++) {
        //     GRAPHICS.drawLine2d(screenpos, screenpos2);
        // }
    }
}
