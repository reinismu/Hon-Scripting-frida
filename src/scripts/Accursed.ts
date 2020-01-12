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
import { Vector2d } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Accursed extends Script {
    private canCast = new DelayedCondition();
    private canCastR = new DelayedCondition();
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
        const allyInTrouble = TARGET_SELECTOR.getAllyInTrouble(q.getDynamicRange(), 40, new Set([this.myHero]));
        let castHero = allyInTrouble;

        if (enemyHero && allyInTrouble) {
            castHero = enemyHero.getHealthPercent() < allyInTrouble.getHealthPercent() ? enemyHero : allyInTrouble;
        } else if (!castHero) {
            castHero = enemyHero;
        }

        if (!castHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, castHero);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const ally = TARGET_SELECTOR.getAllyInTrouble(w.getDynamicRange(), 15);
        if (!ally || ally.getEnemiesFightingMe(400).length == 0) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 1, ally);
    }

    doRLogic() {
        if (!this.canCastR.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if (this.myHero.getHealthPercent() > 25) {
            return;
        }
        if (this.myHero.getEnemiesFightingMe(450).length == 0) {
            return;
        }
        this.canCastR.isTrue(150);
        ACTION.castSpell2(this.myHero, 3);
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

        if (!INPUT.isControlDown()) return;

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doRLogic();
        this.doWLogic();
        this.doQLogic();
        tryUseAllItems(this.myHero, this.canCast);

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }
}
