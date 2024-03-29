import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular } from "../utils/Prediction";
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
} from "../logics/Items";
import { findBestCircularCast } from "../utils/BestCircularLocation";
import { tryEvade } from "../logics/Evade";

export class Oogie extends Script {
    private justCasted = new DelayedCondition();
    private stoppableQ = new StoppableCircularSpell(this.justCasted);
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

        const targetPos = opPredictionCircular(this.myHero, enemyHero, 750, q.getDynamicRange(), 200);
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
        const radius = 200;

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
        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, 750, enemyHeroes);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(400);
        if (!enemyHero) {
            if (this.myHero.hasTool("State_Oogie_Ability2")) {
                this.justCasted.delay(150);
                ACTION.castSpell2(this.myHero, 1);
            }
            return;
        }

        if (!this.myHero.hasTool("State_Oogie_Ability2")) {
            this.justCasted.delay(150);
            ACTION.castSpell2(this.myHero, 1);
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);

        tryEvade(this.myHero, this.orbwalker, this.justCasted); 
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

        this.doWLogic();
        if (this.orbwalker.canAttack.isTrue()) {
            this.doQLogicSpam();
        }

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // Delay automatic actions if manual was preformed
        this.justCasted.delay(100);
    }
}
