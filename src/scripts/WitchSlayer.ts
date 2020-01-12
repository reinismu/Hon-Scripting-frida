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
import { tryUseAllItems } from "./Items";

export class WitchSlayer extends Script {
    private justCasted = new DelayedCondition();
    private justCastedQ = new DelayedCondition();
    private stoppableQ = new StoppableLineSpell(this.justCasted);
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
        const qRange = 750;
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(qRange);
        if (!enemyHero) {
            return;
        }
        this.justCastedQ.delay(1200);
        this.stoppableQ.cast(q, 0, this.myHero, enemyHero, 1600, 120, () => true, 250, qRange);
    }

    doWLogic() {
        if (!this.justCasted.isTrue() || !this.justCastedQ.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(w.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(150);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
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
        if (enemyHero.getCurrentMagicalHealth() > this.getRDamage() || enemyHero.getHealthPercent() > 17 || enemyHero.isDisabled()) {
            return;
        }
        this.justCasted.delay(500);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    private getRDamage(): number {
        const r = this.myHero.getTool(3) as IEntityAbility;
        const boosted = this.myHero.hasTool("State_Pyromancer_Ult_Boost_Art");
        const damages = [0, 500, 650, 850];
        let damage = damages[r.level];
        if (boosted) {
            damage += 200;
        }
        return damage;
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
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doWLogic();
        tryUseAllItems(this.myHero, this.justCasted);

        this.doRLogic();
        this.doQLogic();

        // this.doQDemonHardLogic();
        // this.doGhostMarchersLogic();
        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // const drawVec = Vector.extendDir(OBJECT_MANAGER.myHero.position, { ...OBJECT_MANAGER.myHero.facingVector(), z: 0}, 100);
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
