import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class TestScript extends Script {
    private delayCastQ = false;
    private forceSnapshotSend = false;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.isReady()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero) {
            return;
        }
        if (enemyHero.position.distance2d(this.myHero.position) > 1750) {
            return;
        }
        if (this.delayCastQ) {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(enemyHero.position.x, enemyHero.position.y, enemyHero.position.z);
            this.forceSnapshotSend = false;
            ACTION.castSpell(this.myHero, 0);
            this.delayCastQ = false;
        } else {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(enemyHero.position.x, enemyHero.position.y, enemyHero.position.z);
            this.forceSnapshotSend = false;
            this.delayCastQ = true;
        }
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`myHero:` + OBJECT_MANAGER.myHero);
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        this.doQLogic();
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // GRAPHICS.drawRect(0, 0, 100, 100);
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
