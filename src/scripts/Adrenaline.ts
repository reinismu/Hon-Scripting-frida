import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { getTroublePoints, TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { Vector, Vector2d } from "../utils/Vector";
import { IllustionController } from "../logics/IllusionController";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { tryUseAllItems } from "../logics/Items";
import { tryEvade } from "../logics/Evade";
import { findBestLinearCast } from "../utils/BestLinearCastLocation";
import { opPrediction } from "../utils/Prediction";

export class Adrenaline extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    private emberShardOnCooldown = false;

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
        const goodEnemies = this.myHero
            .getEnemiesInRange(q.getDynamicRange())
            .filter((ene) => !ene.isMagicImmune() && !ene.isInvulnerable());

        if (goodEnemies.length < 2) {
            this.doQAcurateLogic();
            return;
        }
        const castPos = findBestLinearCast(this.myHero, q.getDynamicRange() + 20, 90, 100, 2200, goodEnemies, 2, 80);

        if (!castPos) {
            this.doQAcurateLogic();
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, castPos.x, castPos.y);
    }

    doQAcurateLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        const turnMs = this.myHero.getMsToTurnToPos(enemyHero.position);

        const castLocation = opPrediction(this.myHero.position, enemyHero, 2200, 100 + turnMs, q.getDynamicRange(), 70);
        if (!castLocation) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, castLocation.x, castLocation.y);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }

        this.justCasted.delay(50);
        ACTION.castSpell2(this.myHero, 2);
    }

    doEAAResetCheck() {
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.isReady() && !this.emberShardOnCooldown) {
            this.orbwalker.resetAttackCooldown();
        }
        this.emberShardOnCooldown = !e.isReady();
    }

    private goodTimeToResetAttack() {
        const canResetAttack = (this.myHero.getTool(2) as IEntityAbility).isReady();
        const goodTimeToReset = !this.orbwalker.canAttack.isTrue(280) && this.orbwalker.canMove.isTrue();
        return canResetAttack && goodTimeToReset;
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 12);

        this.doEAAResetCheck();

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        tryEvade(this.myHero, this.orbwalker, this.justCasted, () => {
            const w = this.myHero.getTool(1) as IEntityAbility;
            if (!w.canActivate()) {
                return;
            }
            this.justCasted.delay(200);
            const pos = Vector2d.extendTo(this.myHero.position, this.myBase.position, 450);
            ACTION.castSpellPosition(this.myHero, 1, pos.x, pos.y);
        });
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

        if (this.goodTimeToResetAttack()) {
            this.doELogic();
        }

        if (this.orbwalker.isNotAttacking.isTrue()) {
            this.doQLogic();
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
        this.justCasted.delay(50);
    }
}
