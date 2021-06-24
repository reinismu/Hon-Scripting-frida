import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { CSocket, IEntityAbility, IUnitEntity } from "../honIdaStructs";
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

export class Berserk extends Script {
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

        const hasChainedEnemy = this.myHero.hasTool("State_Berzerker_Ability1_Self");
        if (hasChainedEnemy) {
            const chainedEnemy = OBJECT_MANAGER.heroes.find((h) => h.hasTool("State_Berzerker_Ability1_Enemy"));
            if (!chainedEnemy || chainedEnemy.isDisabled()) {
                return;
            }

            const canKill = () => {
                if (chainedEnemy.getCurrentPhysicalHealth() < 40 * q.level) {
                    return true;
                }
                if (this.myHero.isStaffed() && chainedEnemy.getHealthPercent() < 20) {
                    return true;
                }
                return false;
            };

            if (chainedEnemy.isFacing(this.myHero) || chainedEnemy.position.distance2d(this.myHero.position) > 700 || canKill()) {
                this.justCasted.delay(150);
                ACTION.castSpell2(this.myHero, 0);
            }
            return;
        }

        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(250 + this.myHero.getMsToTurnToPos(enemyHero.position));
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
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(750);
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(150 + this.myHero.getMsToTurnToPos(enemyHero.position));
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

        if (this.myHero.getEnemiesInRange(600).length < 2) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpell2(this.myHero, 2);
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

        tryUseAllItems(this.myHero, this.justCasted);

        this.doWLogic();
        this.doQLogic();
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
