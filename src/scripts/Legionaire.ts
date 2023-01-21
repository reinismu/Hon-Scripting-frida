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
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { findBestCircularCast } from "../utils/BestCircularLocation";
import { IllustionController } from "../logics/IllusionController";
import { tryEvade } from "../logics/Evade";

export class Legionaire extends Script {
    private canCast = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

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

    doPKQLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const pk = this.myHero.getItem("Item_PortalKey");
        if (!pk || !pk.item.canActivate()) {
            return;
        }
        const pkRange = pk.item.getDynamicRange();

        const enemyHeroes = this.myHero.getEnemiesInRange(pkRange + 500).filter((h) => !h.isPhysicalImmune() && !h.isInvulnerable());
        // console.log("Check!");
        const pos = findBestCircularCast(this.myHero, pkRange, 270, 130, enemyHeroes, 100, 4);
        if (!pos) {
            return;
        }

        this.canCast.delay(50);
        ACTION.castSpellPosition(this.myHero, pk.index, pos.x, pos.y);
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

        this.doPKQLogic();

        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 5);

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


        this.doRLogic();
        this.doQLogic();
        // this.doQLogic();
        // this.doWLogic();

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

        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }
}
