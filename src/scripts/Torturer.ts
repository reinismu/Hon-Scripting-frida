import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
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
import { StoppableCircularSpell } from "../utils/StoppableCircularSpell";
import {  tryUseAllItems } from "./Items";
import { findBestCircularCast } from "../utils/BestCircularLocation";

export class Torturer extends Script {
    private justCasted = new DelayedCondition();
    private stoppableQ = new StoppableCircularSpell(this.justCasted);
    private orbwalker = new Orbwalker(this.myHero);

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
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(q.getDynamicRange() + 100);
        if (!enemyHero) {
            return;
        }
        this.stoppableQ.cast(q, 0, this.myHero, enemyHero, 205, 1000, () => true);
    }

    doQLogicSpam() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 120;

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
        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, q.getAdjustedActionTime(), enemyHeroes);
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
        if (this.myHero.getEnemiesInRange(400).length > 1) {
            this.justCasted.delay(350);
            ACTION.castSpell2(this.myHero, 1);
        }
    }

    private getEDamage(): number {
        const e = this.myHero.getTool(2) as IEntityAbility;
        const damages = [0,65,130,195,260]
        return damages[e.level] || 0;
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const enemiesInRange = this.myHero
            .getAllEnemiesInRange(e.getDynamicRange())
            .filter(h => !h.isMagicImmune() && !h.isInvulnerable());

        if (enemiesInRange.length == 0) {
            return;
        }
        const eneToKillEnemy = enemiesInRange.filter(h =>
            h.getAlliesInRange(550).filter(e => e.getCurrentMagicalHealth() < this.getEDamage()).length > 0
        )[0];

        if (eneToKillEnemy) {
            this.justCasted.delay(250);
            ACTION.castSpellEntity(this.myHero, 2, eneToKillEnemy);
            return;
        }

        const bestEnemyWithMostAround = enemiesInRange.sort((a,b) =>
            b.getAlliesInRange(550).length - a .getAlliesInRange(550).length
        )[0];

        console.log(bestEnemyWithMostAround.typeName);
        if(bestEnemyWithMostAround.getAlliesInRange(550).length < 2) {
            return
        }

        this.justCasted.delay(350);
        ACTION.castSpellEntity(this.myHero, 2, bestEnemyWithMostAround);
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(550);
        if (!enemyHero) {
            if (r.isToggled) {
                this.justCasted.delay(250);
                ACTION.castSpell2(this.myHero, 3);
            }
            return;
        }

        if (!r.isToggled) {
            this.justCasted.delay(250);
            ACTION.castSpell2(this.myHero, 3);
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
        // const r = this.myHero.getTool(3) as IEntityAbility;
        // console.log("r.isToggled", r.isToggled);

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

        this.doELogic();
        this.doRLogic();
        this.doWLogic();
        this.doQLogicSpam();

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
