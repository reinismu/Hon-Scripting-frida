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

export class Legionaire extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(200);
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

    doRLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(r.getDynamicRange());
        if (!enemyHero) {
            return;
        }

        if (enemyHero.health < r.level * 150 + 150) {
            ACTION.castSpellEntity(this.myHero, 3, enemyHero);
            this.canCast.delay(500);
        }

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
        tryUseAllItems(this.myHero, this.canCast);


        
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
        // this.doQLogic();
        // this.doWLogic();


        if (!INPUT.isControlDown()) return;
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }
}
