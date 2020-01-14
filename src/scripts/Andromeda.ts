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
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction } from "./Prediction";

export class Andromeda extends Script {
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
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate() || this.myHero.hasTool("State_Andromeda_Ability3_AttackRange")) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange() + 50);
        if (!enemyHero) {
            return;
        }

        const castLocation = opPrediction(this.myHero, enemyHero, 1400, 0, w.getDynamicRange() + 50, 250);
        if (!castLocation) {
            return;
        }
        this.justCasted.delay(200);
        ACTION.castSpellPosition(this.myHero, 1, castLocation.x, castLocation.y);
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
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
        const currentEnemies = this.myHero.getEnemiesInRange(800).length;
        const enemiesAtTele = enemyHero.getAlliesInRange(800).length;
        if (currentEnemies <= enemiesAtTele) {
            return;
        }
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    doREscape() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }

        const enemiesFightingMeCount = this.myHero.getEnemiesFightingMe(500).length;
        if (enemiesFightingMeCount == 0) {
            return;
        }
        const teleAllies = this.myHero
            .getAlliesInRange(r.getDynamicRange())
            .filter(
                h => h.getHealthPercent() > this.myHero.getHealthPercent() && enemiesFightingMeCount < h.getEnemiesFightingMe(650).length
            );

        if (teleAllies) {
            ACTION.castSpellEntity(this.myHero, 3, teleAllies[0]);
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control();

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

        tryUseAllItems(this.myHero, this.justCasted);

        if (this.myHero.isStaffed()) {
            this.doRLogic();
        }
        this.doQLogic();
        this.doWLogic();
        this.doRLogic();
        this.doREscape();
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
