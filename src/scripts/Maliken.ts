import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, Console, IGadgetEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector2d } from "../utils/Vector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { tryUseAllItems } from "../logics/Items";
import { opPrediction } from "../utils/Prediction";

export class Maliken extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private justCasted = new DelayedCondition();
    private throw = new StoppableLineSpell(this.justCasted);
    private thrownSword: IGadgetEntity | null = null;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private hasThrownSword(): boolean {
        return this.myHero.hasTool("State_Maliken_Ability1");
    }

    private isSlowedBySword(entity: IUnitEntity): boolean {
        return entity.hasTool("State_Maliken_Ability1_Slow");
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }

        if (this.hasThrownSword()) {
            return;
        }

        const range = q.getDynamicRange();
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(range);
        if (!enemyHero) {
            return;
        }
        this.throw.cast(
            q,
            0,
            this.myHero,
            enemyHero,
            850,
            350,
            () => true,
            null,
            null,
            this.myHero.getEnemiesInRange(this.myHero.getAttackRange() + 100).length == 0
        );
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        if (this.myHero.hasTool("State_Maliken_Ability2_Flame") && this.myHero.getHealthPercent() < 30) {
            this.justCasted.delay(150);
            ACTION.castSpell2(this.myHero, 1);
            return;
        }
        if (this.myHero.hasTool("State_Maliken_Ability2_Healing") && this.myHero.getHealthPercent() > 36) {
            this.justCasted.delay(150);
            ACTION.castSpell2(this.myHero, 1);
            return;
        }
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
        tryUseAllItems(this.myHero, this.justCasted);
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
        this.doRLogic();
        this.doWLogic();
        // this.doQLogic();
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
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
