import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { IGAME } from "../game/Globals";
import { Vec3, Vector, Vector2d } from "../utils/Vector";
import { shitPrediction, opPrediction, goodPrediction } from "./Prediction";
import { Orbwalker } from "../logics/Orbwalker";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "./Items";

export class Artilery extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private canCast = new DelayedCondition();

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private isShooting() {
        return this.myHero.hasTool("State_Artillery_Ability1");
    }

    doQLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const qRange = q.getDynamicRange() + 50;
        const qRadius = 35;
        //
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(qRange);
        if (!enemyHero) {
            if (this.isShooting()) {
                ACTION.move(this.myHero.position);
            }
            return;
        }
        // 600 ms to do full shoot

        const castLocation = opPrediction(this.myHero, enemyHero, q.getDynamicRange() / 0.75, 0, q.getDynamicRange() + 50, 1);
        if (!castLocation) {
            return;
        }

        const heroes = OBJECT_MANAGER.heroes as IUnitEntity[];
        const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
        const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];

        const collisionEntities = heroes
            .filter((h) => !h.isEnemy(this.myHero))
            .concat(creeps, neutrals)
            .filter(
                (u) =>
                    !u.isDead() && u.isEnemy(this.myHero) &&
                    u.position.distance2dSqr(this.myHero.position) < qRange * qRange &&
                    u.getHealthPercent() > 10 &&
                    u.position.distance2dSqr(enemyHero.position) > 150 * 150
            );

        const startPos = this.myHero.position;
        if (
            collisionEntities.some(
                (u) =>
                    !u.ptr.equals(this.myHero.ptr) &&
                    !u.ptr.equals(enemyHero.ptr) &&
                    Vector2d.distToSegmentSquared(u.position, startPos, castLocation) <
                        (qRadius + u.boundingRadius) * (qRadius + u.boundingRadius)
            )
        ) {
            if (this.isShooting()) {
                ACTION.move(this.myHero.position);
            }
            return;
        }

        this.canCast.delay(50);
        ACTION.castSpellPosition(this.myHero, 0, castLocation.x, castLocation.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        // IGAME.mysteriousStruct.drawIndicatorFlag = 1;
        if (!INPUT.isControlDown()) return;
        // console.log(`drawIndicatorFlag:` + IGAME.mysteriousStruct.drawIndicatorFlag);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`MyVelocity: ` + Vector2d.length(VELOCITY_UPDATER.getVelocity(this.myHero)));
        // console.log(`moveSpeed: ` + this.myHero.getMoveSpeed(true));
        // const checkVec = { ...this.myHero.facingVector(), z: 0 };
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        // OBJECT_MANAGER.gadgets.forEach(h => {
        //     // console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     console.log(`${h.typeName}`);
        // });

        // console.log(`getCurrentPhysicalHealth:${this.myHero.getCurrentPhysicalHealth()}`);
        // console.log(`getPhysicalResistance:${this.myHero.getPhysicalResistance()}`);

        tryUseAllItems(this.myHero, this.canCast);
        this.doQLogic();
        if (this.canCast.isTrue() && !this.isShooting()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition, true);
        }
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     const velocity = VELOCITY_UPDATER.getVelocity(h);
        //     const drawVec = CLIENT.worldToScreen(Vector.add(h.position, { ...velocity, z: 0 }));
        //     GRAPHICS.drawRect(drawVec.x, drawVec.y, 8, 8);
        // });
        // console.log("draw");
    }

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     if (!INPUT.isControlDown()) return;
    //     // Dont update state if we are shooting

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
