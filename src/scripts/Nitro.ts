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
import { Vec3, Vector } from "../utils/Vector";
import { shitPrediction } from "./Prediction";

export class Nitro extends Script {
    private delayCastQ = false;
    private forceSnapshotSend = false;
    private myHeroCached: IUnitEntity | null = null;
    private lastCast = 0;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 80);
        if (!enemyHero) {
            return;
        }

        const castLocation = shitPrediction(enemyHero);
        if (this.delayCastQ) {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            this.lastCast = Date.now();
            ACTION.castSpell(this.myHero, 0);
            this.delayCastQ = false;
        } else {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            this.delayCastQ = true;
        }
    }

    doLexLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const lex = this.myHero.getItem("Item_LexTalionis");
        if (!lex) {
            return;
        }
        if (!lex.item.isReady()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(lex.item.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        this.lastCast = Date.now();
        ACTION.castSpellEntity(this.myHero, lex.index, enemyHero);
    }

    doGhostMarchersLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const boots = this.myHero.getItem("Item_EnhancedMarchers");
        if (!boots) {
            return;
        }
        if (!boots.item.isReady()) {
            return;
        }
        ACTION.castSpell2(this.myHero, boots.index);
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
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        // console.log(`getCurrentPhysicalHealth:${this.myHero.getCurrentPhysicalHealth()}`);
        // console.log(`getPhysicalResistance:${this.myHero.getPhysicalResistance()}`);
        this.doQLogic();
        this.doLexLogic();
        this.doGhostMarchersLogic();
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

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     if (!INPUT.isControlDown()) return;
    //     // Dont update state if we are shooting

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
