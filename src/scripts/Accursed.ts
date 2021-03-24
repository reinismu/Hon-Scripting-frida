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
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { off } from "process";

export class Accursed extends Script {
    private canCast = new DelayedCondition();
    private canCastR = new DelayedCondition();
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
        const allyInTrouble = TARGET_SELECTOR.getAllyInTrouble(q.getDynamicRange(), 40, new Set([this.myHero]));
        let castHero = allyInTrouble;

        if (enemyHero && allyInTrouble) {
            castHero = enemyHero.getHealthPercent() < allyInTrouble.getHealthPercent() ? enemyHero : allyInTrouble;
        } else if (!castHero) {
            castHero = enemyHero;
        }

        if (!castHero) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, castHero);
    }

    doWLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const ally = TARGET_SELECTOR.getAllyInTrouble(w.getDynamicRange(), 15);
        if (!ally || ally.getEnemiesFightingMe(500).length == 0) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpellEntity(this.myHero, 1, ally);
    }

    doELogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const ene = TARGET_SELECTOR.getEasiestPhysicalKillInRange(200);
        if (!ene) {
            return;
        }

        this.canCast.delay(250);
        ACTION.castSpell(this.myHero, 2);
    }


    doRLogic() {
        if (!this.canCastR.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if (this.myHero.getHealthPercent() > 25) {
            return;
        }
        if (this.myHero.getEnemiesFightingMe(450).length == 0) {
            return;
        }
        this.canCastR.isTrue(150);
        ACTION.castSpell2(this.myHero, 3);
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

        tryUseAllItems(this.myHero, this.canCast);
        this.doWLogic();
        this.doRLogic();


        if (!INPUT.isControlDown()) return;

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        if (this.orbwalker.canMove.isTrue()) {
            this.doQLogic();
            // this.doELogic();



        }

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }
    // @Subscribe("DrawEvent")
    // onDraw() {
    //     // console.log("draw");

    //     OBJECT_MANAGER.heroes.forEach((h) => {
    //         if (h.ptr === this.myHero.ptr) {
    //             return;
    //         };
    //         const angle = h.turnAngle(this.myHero.position);
    //         const position1 = Vector2d.extendDir(h.position, h.facingVector(angle * 0.3), 80);
    //         const position2 = Vector2d.extendDir(h.position, h.facingVector(-angle * 0.3), 80);

    //         const position =
    //             Vector2d.distance(position1, this.myHero.position) < Vector2d.distance(position2, this.myHero.position)
    //                 ? position1
    //                 : position2;

    //         if (position) {
    //             const screenPos = CLIENT.worldToScreen({ ...position, z: h.position.z });
    //             GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
    //         }
    //     });
    // }
}
