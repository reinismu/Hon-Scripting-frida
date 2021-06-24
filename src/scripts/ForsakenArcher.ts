import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPredictionCircular } from "../utils/Prediction";
import { tryUseAllItems } from "../logics/Items";
import { findBestCircularCast } from "../utils/BestCircularLocation";
import { IllustionController } from "../logics/IllusionController";

export class ForsakenArcher extends Script {
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

        const targetPos = opPredictionCircular(this.myHero, enemyHero, 800, q.getDynamicRange(), 225);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
    }

    doQLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 225;

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
        if (enemyHeroes.length === 1 || lowestHpPercent < 30) {
            this.doQLogic();
            return;
        }
        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, 800, enemyHeroes);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(true);

        tryUseAllItems(this.myHero, this.justCasted);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;

        // const spell = this.myHero.getTool(0) as IEntityAbility;
        // console.log(`typeName:` + this.myHero.typeName);
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`getRDamage:` + this.getRDamage());
        // console.log(`getDynamicRange:` + spell.getDynamicRange());
        // console.log(`getAdjustedActionTime:` +  spell.getAdjustedActionTime());
        // console.log(`getAdjustedAttackActionTime:` +  OBJECT_MANAGER.myHero.getAdjustedAttackActionTime());
        // console.log(`getAdjustedAttackDuration:` +  OBJECT_MANAGER.myHero.getAdjustedAttackDuration());
        // // console.log(`getCanAttack:` +  OBJECT_MANAGER.myHero.getCanAttack());
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // this.doWLogic();

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        if (this.orbwalker.canAttack.isTrue()) {
            this.doQLogicSpam();
        }

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent() {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }
}
