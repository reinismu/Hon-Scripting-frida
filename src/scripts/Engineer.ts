import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IGadgetEntity } from "../honIdaStructs";
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
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";

export class Engineer extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    private electricFenzyOnCooldown = false;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(w.getDynamicRange() + 30);
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(300);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doELogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate() || this.getMines().length >= this.getMaxPlacedMines()) {
            return;
        }
        const mine = this.findClosestMine(e.getDynamicRange() + 30);
        if (!mine) {
            return;
        }
        this.justCasted.delay(100);
        ACTION.castSpellPosition(this.myHero, 2, mine.position.x, mine.position.y);
    }

    doTabletLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const tablet = this.myHero.getItem("Item_PushStaff");
        if (!tablet) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(tablet.item.getDynamicRange() + 30, this.myHero, (hero) => {
            const eneVelocity = VELOCITY_UPDATER.getVelocity(hero);
            const enemyPositionAfterDelay = Vector2d.add(hero.position, Vector2d.mul(eneVelocity, 1000));
            const jumpPosition = Vector2d.extendTo(hero.position, enemyPositionAfterDelay, 500);
            return !!this.getMines().find((m) => m.position.distance2d(jumpPosition) < 200);
        });
        // const mine = this.findClosestMine(e.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        this.justCasted.delay(100);
        ACTION.castSpellEntity(this.myHero, tablet.index, enemyHero);
    }

    getMaxPlacedMines() {
        const e = this.myHero.getTool(2) as IEntityAbility;
        const minesPerLevel = [0, 3, 3, 4, 5];
        return minesPerLevel[e.level];
    }

    getMines() {
        const me = this.myHero;
        const mines = OBJECT_MANAGER.gadgets.filter(
            (gadget) => !gadget.isDead() && gadget.typeName === "Gadget_Engineer_Ability3" && !gadget.isEnemy(me)
        );
        return mines;
    }

    findClosestMine(range: number): IGadgetEntity | null {
        const me = this.myHero;
        const mine = this.getMines()
            .filter((mine) => mine.position.distance2d(me.position) < range)
            .sort((h1, h2) => h1.position.distance2dSqr(me.position) - h2.position.distance2dSqr(me.position))[0];
        if (mine) {
            return mine;
        }
        return null;
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
        this.doTabletLogic();

        if (!INPUT.isControlDown()) return;

        // const facingAngle = this.myHero.facingAngle;
        // console.log(`getAttackReadyValue1 ${this.myHero.getAttackReadyValue1()}`);
        // console.log(`field_76C ${this.myHero.field_76C}`);

        // console.log(`heroPtrs ${this.myHero.ptr.add(0x6b0)}`);

        // OBJECT_MANAGER.heroes.forEach((h) => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doELogic();

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    // @Subscribe("DrawEvent")
    // onDraw() {
    //     // OBJECT_MANAGER.buildings.forEach((h) => {
    //     //     const drawVec = CLIENT.worldToScreen(h.position);
    //     //     if (!h.isEnemy(this.myHero)) {
    //     //         GRAPHICS.drawRect(drawVec.x, drawVec.y, 8, 8);
    //     //     }
    //     // });
    //     const h = this.myBase;
    //     const drawVec = CLIENT.worldToScreen(h.position);
    //     // if (!this.orbwalker.canAttack.isTrue(280) && this.orbwalker.canMove.isTrue()) {
    //         GRAPHICS.drawRect(drawVec.x, drawVec.y, 80, 80);
    //     // }
    // }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // Delay automatic actions if manual was preformed
        this.justCasted.delay(100);
    }
}
