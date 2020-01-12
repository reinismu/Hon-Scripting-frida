import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback, CSocket } from "../honIdaStructs";
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
import { tryUseAllItems } from "./Items";

export class MasterOfArms extends Script {
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
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.canCast.delay(q.getAdjustedActionTime());
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doELogic() {
        if (!this.canCast.isTrue() || this.myHero.isStaffed()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }
        const bulldozerRange = this.myHero.getAttackRange() + (this.isInBulldozer() ? 0 : 150);
        const cheetahRange = this.myHero.getAttackRange() + (this.isInBulldozer() ? -150 : 0);

        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(bulldozerRange + 20);
        if (!enemyHero) {
            return;
        }

        if (this.isInBulldozer() && Vector2d.distance(enemyHero.position, this.myHero.position) <= cheetahRange) {
            this.canCast.delay(50);
            ACTION.castSpell2(this.myHero, 2);
            return;
        }

        if (!this.isInBulldozer() && Vector2d.distance(enemyHero.position, this.myHero.position) > cheetahRange) {
            this.canCast.delay(50);
            ACTION.castSpell2(this.myHero, 2);
            return;
        }
    }

    doRLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }

        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero || Vector2d.distance(enemyHero.position, this.myHero.position) > 550) {
            return;
        }

        this.canCast.delay(50);
        ACTION.castSpellEntity(this.myHero, 3, this.myHero,);
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
            tryUseAllItems(this.myHero, this.canCast);
            this.doRLogic();
            this.doELogic();
        }


        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    isInBulldozer() {
        return this.myHero.getAttackRange() >= 650;
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
