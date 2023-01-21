import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { getTroublePoints, TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { Vector, Vector2d } from "../utils/Vector";
import { IllustionController } from "../logics/IllusionController";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { tryUseAllItems } from "../logics/Items";
import { tryEvade } from "../logics/Evade";

export class Revenant extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(this.myHero.getAttackRange() + 40);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(50);
        ACTION.castSpellEntity(this.myHero, 0, this.myHero);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange() + 30);
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(100);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate() || this.myHero.getManaPercent() < 48) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(700);
        if (!enemyHero) {
            return;
        }

        const dist = Vector2d.distance(enemyHero.position, this.myHero.position);
        if (enemyHero.isDisabled() && dist < 500) {
            return;
        }

        // if (dist > 450 || this.goodTimeToResetAttack()) {
        const castLocation = Vector2d.extendTo(enemyHero.position, this.myHero.position, -250);
        // const castLocation = Vector2d.extendTo(this.myHero.position, enemyHero.position, Math.max(dist - 250, 50));
        // const castLocation = enemyHero.position;

        this.justCasted.delay(130);
        ACTION.castSpellPosition(this.myHero, 3, castLocation.x, castLocation.y);
        // }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 12);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        tryEvade(this.myHero, this.orbwalker, this.justCasted);
        tryUseAllItems(this.myHero, this.justCasted);

        if (!INPUT.isControlDown()) return;

        // const facingAngle = this.myHero.facingAngle;
        // console.log(`getAttackReadyValue1 ${this.myHero.getAttackReadyValue1()}`);
        // console.log(`field_76C ${this.myHero.field_76C}`);

        // console.log(`heroPtrs ${this.myHero.ptr.add(0x6b0)}`);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doWLogic();
        this.doQLogic();

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
