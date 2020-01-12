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

export class SoulReaper extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(500);
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpell2(this.myHero, 0);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(350);
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpell2(this.myHero, 1);
    }

    private getRPercent(level: number): number {
        return [0, 0.4, 0.65, 0.9][level] + (this.myHero.isStaffed() ? 0.3 : 0);
    }

    doRLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(r.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }
        const missingHealth = enemyHero.getMaxHealth() - enemyHero.getCurrentHealth();
        const dmgOneEnemy = missingHealth * this.getRPercent(r.level);
        if (dmgOneEnemy < enemyHero.getCurrentMagicalHealth()) {
            return;
        }
        this.canCast.delay(500);
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

        this.doRLogic();
        this.doQLogic();
        tryUseAllItems(this.myHero, this.canCast);
        this.doWLogic();

        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }
}
