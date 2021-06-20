import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, Console, IGadgetEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector2d } from "../utils/Vector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { tryUseAllItems } from "./Items";
import { opPrediction, opPredictionCircular } from "./Prediction";
import { StoppableCircularSpell } from "../utils/StoppableCircularSpell";
import { IllustionController } from "../logics/IllusionController";
import { findBestCircularCast } from "../utils/BestCircularLocation";

export class Vindicator extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private justCasted = new DelayedCondition();
    private stoppableW = new StoppableCircularSpell(this.justCasted);
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

        const targetPos = opPredictionCircular(this.myHero, enemyHero, 250, q.getDynamicRange(), 170);
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
        const radius = 250;

        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(q.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable() && !h.isDisabled());

        if (enemyHeroes.length === 0) {
            return;
        }
        const lowestHpPercent = enemyHeroes.map((h) => h.getHealthPercent()).sort((a, b) => a - b)[0];
        if (enemyHeroes.length === 1 || lowestHpPercent < 15) {
            this.doQLogic();
            return;
        }
        const bestloc = findBestCircularCast(this.myHero, q.getDynamicRange(), radius, 250, enemyHeroes);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, bestloc.x, bestloc.y);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const radius = 250;

        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const enemyHeroes = this.myHero
            .getEnemiesInRange(e.getDynamicRange() + radius)
            .filter((h) => !h.isMagicImmune() && !h.isInvulnerable() && !h.isDisabled() && !h.isSilenced());

        if (enemyHeroes.length === 0) {
            return;
        }

        const bestloc = findBestCircularCast(this.myHero, e.getDynamicRange(), radius, 150, enemyHeroes);
        if (!bestloc) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 2, bestloc.x, bestloc.y);
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if (this.myHero.getEnemiesInRange(400).length > 1) {
            this.justCasted.delay(150);
            ACTION.castSpell2(this.myHero, 3);
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(true);
        // this.thrownSword = OBJECT_MANAGER.gadgets.find(g => g.typeName == "Gadget_Maliken_Ability1") || null;
        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`myHero: ` + OBJECT_MANAGER.myHero.ptr);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        // OBJECT_MANAGER.gadgets.forEach(h => {
        //     console.log(`gadget: ${h.typeName} -> ${new NativePointer(h.field_B8)} : me ${this.player.networkId}`);
        // });
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} field_10C: ` + h.field_10C);
        //     console.log(`${h.typeName} boundingRadius: ` + h.boundingRadius);
        //     console.log(`${h.typeName} field_114: ` + h.field_114);
        // });
        // OBJECT_MANAGER.creeps.forEach(h => {
        //     console.log(`creep:${h.typeName} ${h.boundingRadius}`);
        // });
        // this.doRLogic();
        tryUseAllItems(this.myHero, this.justCasted);
        this.doQLogicSpam();
        this.doELogic();
        // this.doQLogic();
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

    @Subscribe("DrawEvent")
    onDraw() {
        // console.log("draw");
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     if (h.isIllusion()) {
        //         const screenPos = CLIENT.worldToScreen(h.position);
        //         GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
        //     }
        // });
    }

    @Subscribe("RequestStartAnimEvent")
    onAnimationStart(args: NativePointer[]) {
        // Dont update state if we are shooting
        // console.log(`RequestStartAnimEvent: ${args[1]} ${args[1].read32BitString()}`);
    }
}
