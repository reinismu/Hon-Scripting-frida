import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { IGAME } from "../game/Globals";
import { Vec3, Vector, Vector2d } from "../utils/Vector";
import { shitPrediction, opPrediction, goodPrediction } from "../utils/Prediction";
import { Orbwalker } from "../logics/Orbwalker";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";

export class Nitro extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private delayCastQ = false;
    private forceSnapshotSend = false;
    private myHeroCached: IUnitEntity | null = null;
    private canCast = new DelayedCondition();

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
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 50);
        if (!enemyHero) {
            return;
        }

        const castLocation = opPrediction(this.myHero.position, enemyHero, q.getDynamicRange() * 2, 0, q.getDynamicRange() + 50, 1);
        if(!castLocation) {
            return;
        }
        if (this.delayCastQ) {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, enemyHero.position.z);
            this.forceSnapshotSend = false;
            console.log(`Cast Q ${Date.now()}`);
            ACTION.castSpell(this.myHero, 0);
            this.canCast.delay(100);
        } else {
            this.delayCastQ = true;
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, enemyHero.position.z);
            this.forceSnapshotSend = false;
            setTimeout(() => {
                this.delayCastQ = false;
            }, 250);
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
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
        
        this.doQLogic();
        tryUseAllItems(this.myHero, this.canCast);
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition, true);
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

    @Subscribe("SendClientSnapshotEvent")
    onSendClientSnapshot(args: NativePointer[]) {
        if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting

        const buffer = new MyBuffer(args[1]);
        const data = new Uint8Array(buffer.dataBuffer);

        if (this.delayCastQ && !this.forceSnapshotSend) {
            buffer.size = 0;
            buffer.allocatedSize = 0;
        }
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
