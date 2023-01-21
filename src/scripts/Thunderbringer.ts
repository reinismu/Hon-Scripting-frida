import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";
import { tryEvade } from "../logics/Evade";

export class Thunderbringer extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }
        this.canCast.delay(100);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }
    
    doQFarm() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;

        if (!q.canActivate()) {
            return;
        }
        const creep = this.getQKillableCreep(q.getDynamicRange() + 20);
        if (!creep) {
            return;
        }
        this.canCast.delay(100);
        ACTION.castSpellEntity(this.myHero, 0, creep);
    }

    doQClear() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;

        if (!q.canActivate()) {
            return;
        }
        const creep = this.getQCreep(q.getDynamicRange() + 10);
        if (!creep) {
            return;
        }
        this.canCast.delay(100);
        ACTION.castSpellEntity(this.myHero, 0, creep);
    }
    
    private getQDamage(): number {
        const r = this.myHero.getTool(0) as IEntityAbility;
        const damages = [0, 85, 100, 115, 130];
        let damage = damages[r.level];
        return damage;
    }

    private getQKillableCreep(qRange: number): IUnitEntity | null {
        const closestKillableCreep = OBJECT_MANAGER.creeps
            .filter(c => !c.isDead() && c.isEnemy(this.myHero) && c.getCurrentMagicalHealth() <= this.getQDamage())
            .sort((h1, h2) => h2.getAlliesInRange(400).length - h1.getAlliesInRange(400).length)[0];
        if (!closestKillableCreep) {
            return null;
        }
        const dist = Vector2d.distance(closestKillableCreep.position, this.myHero.position);
        if (dist > qRange) {
            return null;
        }

        return closestKillableCreep;
    }

    private getQCreep(qRange: number): IUnitEntity | null {
        const closestKillableCreep = OBJECT_MANAGER.creeps
            .filter(c => !c.isDead() && c.isEnemy(this.myHero))
            .sort((h1, h2) => h2.getAlliesInRange(400).length - h1.getAlliesInRange(400).length)[0];
        if (!closestKillableCreep) {
            return null;
        }
        const dist = Vector2d.distance(closestKillableCreep.position, this.myHero.position);
        if (dist > qRange) {
            return null;
        }

        return closestKillableCreep;
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(100);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (INPUT.isCharDown("C")) {
            this.doQFarm();
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }
        if (INPUT.isCharDown("V")) {
            this.doQClear();
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        tryEvade(this.myHero, this.orbwalker, this.canCast);
        tryUseAllItems(this.myHero, this.canCast);
        
        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`getAdjustedAttackCooldown:` +  OBJECT_MANAGER.myHero.getAdjustedAttackCooldown());
        // console.log(`getAdjustedAttackActionTime:` +  OBJECT_MANAGER.myHero.getAdjustedAttackActionTime());
        // console.log(`getAdjustedAttackDuration:` +  OBJECT_MANAGER.myHero.getAdjustedAttackDuration());
        // console.log(`getMinAttackDamage:` +  OBJECT_MANAGER.myHero.getMinAttackDamage());
        // // console.log(`getCanAttack:` +  OBJECT_MANAGER.myHero.getCanAttack());
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });

        //  OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //         if(tool instanceof IEntityAbility) {
        //             console.log(`->>> canActivate2: ${tool.canActivate()}`);
        //         }
        //     }
        // });
        this.doWLogic();
        this.doQLogic();

        if (!this.canCast.isTrue()) {
            return;
        }
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // const drawVec = Vector.extendTo(OBJECT_MANAGER.myHero.position, IGAME.mysteriousStruct.mousePosition, 100); 
        // const screenpos = CLIENT.worldToScreen(drawVec);
        // GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
        // console.log("draw");
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
