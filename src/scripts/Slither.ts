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
import { tryUseAllItems } from "../logics/Items";
import { tryEvade } from "../logics/Evade";

export class Slither extends Script {
    private canCast = new DelayedCondition();
    private stoppableQ = new StoppableLineSpell(this.canCast);
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
        this.stoppableQ.cast(q, 0, this.myHero, enemyHero, 1600, 100);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        const castLocation = enemyHero.position;

        this.canCast.delay(100);
        ACTION.castSpellPosition(this.myHero, 1, castLocation.x, castLocation.y);
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

        tryEvade(this.myHero, this.orbwalker, this.canCast);
        tryUseAllItems(this.myHero, this.canCast);
        if (!INPUT.isControlDown() || this.myHero.isDead()) return;
        // console.log(`isButtonDown ${"A".charCodeAt(0)}:` + INPUT.isCharDown("A"));
        // console.log(`getFinalMinAttackDamage:` + this.myHero.getFinalMinAttackDamage());
        // console.log(`getFinalMaxAttackDamage:` + this.myHero.getFinalMaxAttackDamage());

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
        if (this.orbwalker.canAttack.isTrue()) {
            this.doQLogic();
            this.doWLogic();
        }
        // this.doQDemonHardLogic();
        // this.doGhostMarchersLogic();
        if (this.canCast.isTrue()) {
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
        // Delay automatic actions if manual was preformed
        this.canCast.delay(100);
    }
}
