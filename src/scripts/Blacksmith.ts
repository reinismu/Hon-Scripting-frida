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
import { Vector2d } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";;
import { tryEvade } from "../logics/Evade";
export class Blacksmith extends Script {
    private canCast = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (!this.canCast.isTrue()) {
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

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doELogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate() || this.myHero.hasTool("State_DwarfMagi_Ability3")) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero) {
            return;
        }

        const dist = Vector2d.distance(enemyHero.position, this.myHero.position);
        if (dist > 1950) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 2, this.myHero);
    }

    doRLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate() || !this.myHero.isStaffed()) {
            return;
        }
        if (this.myHero.getHealthPercent() > 40 && this.myHero.getManaPercent() > 30) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(r.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
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

        tryEvade(this.myHero, this.orbwalker, this.canCast);
        tryUseAllItems(this.myHero, this.canCast);
        if (!INPUT.isControlDown()) return;

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doWLogic();
        this.doQLogic();
        this.doRLogic();
        if (this.orbwalker.isNotAttacking.isTrue()) {
            this.doELogic();
        }

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // Delay automatic actions if manual was preformed
        this.canCast.delay(100);
    }
}
