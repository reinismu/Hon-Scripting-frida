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
import { findBestLinearCast } from "../utils/BestLinearCastLocation";

export class Tundra extends Script {
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
        const goodEnemies = this.myHero.getEnemiesInRange(q.getDynamicRange()).filter( (ene) => !ene.isMagicImmune() && !ene.isInvulnerable());
        const castPos = findBestLinearCast(this.myHero, q.getDynamicRange() + 20, 150, 300, 1700, goodEnemies, 2);
    
        if (!castPos) {
            return;
        }

        const castLocation = Vector2d.extendTo(this.myHero.position, castPos, 1500);
        this.justCasted.delay(200);
        ACTION.castSpellPosition(this.myHero, 0, castLocation.x, castLocation.y);
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

        this.doQLogic();

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
