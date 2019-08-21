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
import { Vec3, Vector } from "../utils/Vec3";

export class TestScript extends Script {
    private delayCastQ = false;
    private forceSnapshotSend = false;
    private myHeroCached: IUnitEntity | null = null;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private shitPrediction(enemy: IUnitEntity): Vec3 {
        // console.log(`my facing: ${this.myHero.facingAngle}`);
        // console.log(`Enemy facing: ${enemy.facingAngle}`);
        return Vector.extendDir(enemy.position, { ...enemy.facingVector(), z: 0 }, 50);
        // return Vector.extendTo(enemy.position, IGAME.mysteriousStruct.mousePosition, 200);
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.isReady()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 80);
        if (!enemyHero) {
            return;
        }

        const castLocation = this.shitPrediction(enemyHero);
        if (this.delayCastQ) {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            ACTION.castSpell(this.myHero, 0);
            this.delayCastQ = false;
        } else {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            this.delayCastQ = true;
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        // IGAME.mysteriousStruct.drawIndicatorFlag = 1;
        if (!INPUT.isControlDown()) return;
        // console.log(`drawIndicatorFlag:` + IGAME.mysteriousStruct.drawIndicatorFlag);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // const checkVec = { ...this.myHero.facingVector(), z: 0 };
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // console.log(`getArmor:${this.myHero.getArmor()}`);
        // console.log(`getCurrentPhysicalHealth:${this.myHero.getCurrentPhysicalHealth()}`);
        // console.log(`getPhysicalResistance:${this.myHero.getPhysicalResistance()}`);
        this.doQLogic();
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // if (this.myHeroCached != null) {
        //     OBJECT_MANAGER.heroes.forEach(h => {
        //         const drawVec = CLIENT.worldToScreen(this.shitPrediction(h));
        //         GRAPHICS.drawRect(drawVec.x, drawVec.y, 8, 8);
        //     });
        // }
        // console.log("draw");
    }

    @Subscribe("SendClientSnapshotEvent")
    onSendClientSnapshot(args: NativePointer[]) {
        if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting

        const buffer = new MyBuffer(args[1]);
        const data = new Uint8Array(buffer.dataBuffer);

        if (this.forceSnapshotSend) {
            return;
        }
        buffer.size = 0;
        buffer.allocatedSize = 0;
    }
}
