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

export class Armadon extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        const dist = Vector2d.distance(enemyHero.position, this.myHero.position);
        if (dist < 250) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(650);
        if (!enemyHero ) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpell2(this.myHero, 1);
    }

    private getWDamage(): number {
        const r = this.myHero.getTool(1) as IEntityAbility;
        const damages = [0, 20, 40, 60, 80];
        let damage = damages[r.level];
        return damage;
    }

    doWFarm() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;

        if (!q.canActivate()) {
            return;
        }
        const creep = this.getWKillableCreep(650);
        if (!creep) {
            return;
        }
        this.canCast.delay(100);
        ACTION.castSpell2(this.myHero, 1);
    }

    private getWKillableCreep(qRange: number): IUnitEntity | null {
        const closestKillableCreep = OBJECT_MANAGER.creeps
            .filter(c => !c.isDead() && c.isEnemy(this.myHero) && c.getCurrentPhysicalHealth() <= this.getWDamage())
            .sort((h1, h2) => h1.position.distance2d(this.myHero.position) - h2.position.distance2d(this.myHero.position))[0];
        if (!closestKillableCreep) {
            return null;
        }
        const dist = Vector2d.distance(closestKillableCreep.position, this.myHero.position);
        if (dist > qRange) {
            return null;
        }

        return closestKillableCreep;
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            this.doWFarm();
            return;
        }


        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            this.doWFarm();
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

        this.doWLogic();
        tryUseAllItems(this.myHero, this.canCast);
        if (this.orbwalker.isNotAttacking.isTrue()) {
            this.doQLogic();
        }

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }
}
