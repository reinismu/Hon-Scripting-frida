import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback, IGadgetEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular } from "./Prediction";
import { tryUseAllItems } from "./Items";

export class Scout extends Script {
    private canCast = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);

    private closestWard: IGadgetEntity | null = null;

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
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
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

        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(400);
        if (!enemyHero) {
            return;
        }

        const castLocation = Vector2d.extendTo(this.myHero.position, enemyHero.position, 90);

        this.canCast.delay(150);
        ACTION.castSpellPosition(this.myHero, 1, castLocation.x, castLocation.y);
    }

    doELogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(5) as IEntityAbility;
        // console.log(`ward: ${this.closestWard}`);
        if (!e.canActivate() || this.closestWard == null) {
            return;
        }

        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(350, this.closestWard);
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(100);
        ACTION.castSpell2(this.myHero, 5);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);

        this.closestWard =
            OBJECT_MANAGER.gadgets
                .sort((h1, h2) => h1.position.distance2d(this.myHero.position) - h2.position.distance2d(this.myHero.position))
                .find(g => g.typeName == "Gadget_Scout_Ability2") || null;

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;
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

        // if (this.orbwalker.canAttack.isTrue()) {
        //     tryUseAllItems(this.myHero, this.canCast);
        //     this.doWLogic();
        //     this.doQLogic();
        // }
        // // this.doQDemonHardLogic();
        // // this.doGhostMarchersLogic();
        // if (this.canCast.isTrue()) {
        // }
        this.doELogic();
        this.doWLogic();
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
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
        // // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }
}
