import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR, getTroublePoints } from "./TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "./Items";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Jeraziah extends Script {
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
        const alliesInRange = this.myHero
            .getAlliesInRange(q.getDynamicRange())
            .sort((h1, h2) => getTroublePoints(h2) - getTroublePoints(h1));
        if (alliesInRange.length == 0) {
            return;
        }

        const allyToKillEnemy = alliesInRange.filter(h =>
            h.getEnemiesInRange(250).filter(e => e.getHealthPercent() > 7 && e.getCurrentMagicalHealth() < this.getQDamage()).length > 0
        )[0];

        let castHero = null;
        const bestHeal =
            getTroublePoints(alliesInRange[0]) > 40 && alliesInRange[0].getEnemiesFightingMe(600).length ? alliesInRange[0] : null;

        if (!allyToKillEnemy && !bestHeal) {
            return;
        }

        if (!allyToKillEnemy && bestHeal) {
            console.log("bestHeal");
            castHero = bestHeal;
        } else if (allyToKillEnemy && !bestHeal) {
            console.log("allyToKillEnemy");
            castHero = allyToKillEnemy;
        } else if (bestHeal && allyToKillEnemy) {
            console.log("logic");
            //We got both
            if (getTroublePoints(bestHeal) > 60) {
                castHero = bestHeal;
            } else {
                castHero = allyToKillEnemy;
            }
        }

        if (!castHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, castHero);
    }

    private getQDamage(): number {
        const q = this.myHero.getTool(0) as IEntityAbility;
        return q.level * 90;
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const ally = TARGET_SELECTOR.getAllyInTrouble(w.getDynamicRange(), 30);
        if (!ally || ally.getEnemiesFightingMe(400).length == 0) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 1, ally);
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
        //     console.log(`${h.typeName}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i) as IEntityAbility;
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName} range ${tool.dynamicRange}`);
        //     }
        // });

        // this.doRLogic();
        this.doQLogic();
        this.doWLogic();
        tryUseAllItems(this.myHero, this.canCast);

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }
}
