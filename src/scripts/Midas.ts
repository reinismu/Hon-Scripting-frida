import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular } from "./Prediction";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { StoppableCircularSpell } from "../utils/StoppableCircularSpell";
import {
    doGhostMarchersLogic,
    doShrunkensLogic,
    doSheepstickLogic,
    doNullFireLogic,
    doGrimoireOfPowerLogic,
    doHellfireLogic,
    tryUseAllItems,
} from "./Items";
import { findBestCircularCast, findBestCircularProjectileCast } from "../utils/BestCircularLocation";

export class Midas extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);

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

        const turnTime = this.myHero.getMsToTurnToPos(enemyHero.position);
        const targetPos = opPrediction(this.myHero, enemyHero, 1200, 350 + turnTime, q.getDynamicRange(), 50);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(150);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
    }

    doQLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 200;

        const w = this.myHero.getTool(0) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(w.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemyHeroes.length === 0) {
            return;
        }
        const lowestHpPercent = enemyHeroes.map((h) => h.getHealthPercent()).sort((a, b) => a - b)[0];
        if (enemyHeroes.length === 1 || lowestHpPercent < 30) {
            this.doQLogic();
            return;
        }

        const bestloc = findBestCircularProjectileCast(this.myHero, w.getDynamicRange(), radius, 400, 1200, enemyHeroes, 80, 2);
        if (!bestloc) {
            this.doQLogic();
            return;
        }

        const turnTime = this.myHero.getMsToTurnToPos(bestloc);
        this.justCasted.delay(150 + turnTime);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
    }

    doWLogic() {
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange() + 100);
        if (!enemyHero) {
            return;
        }

        const turnTime = this.myHero.getMsToTurnToPos(enemyHero.position);
        const targetPos = opPrediction(this.myHero, enemyHero, 1000, 400 + turnTime, w.getDynamicRange(), 50);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(150 + turnTime);
        ACTION.castSpellPosition(this.myHero, 1, targetPos.x, targetPos.y);
    }

    doWLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 200;

        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(w.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemyHeroes.length === 0) {
            return;
        }
        const lowestHpPercent = enemyHeroes.map((h) => h.getHealthPercent()).sort((a, b) => a - b)[0];
        if (enemyHeroes.length === 1 || lowestHpPercent < 30) {
            this.doWLogic();
            return;
        }
        const bestloc = findBestCircularProjectileCast(this.myHero, w.getDynamicRange(), radius, 450, 1000, enemyHeroes, 80, 2);
        if (!bestloc) {
            this.doWLogic();
            return;
        }

        this.justCasted.delay(50);
        ACTION.castSpellPosition(this.myHero, 1, bestloc.x, bestloc.y);
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

        tryUseAllItems(this.myHero, this.justCasted);

        this.doQLogicSpam();
        this.doWLogicSpam();

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }
}
