import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME, SHARED_MODULE } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction } from "../utils/Prediction";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { tryEvade } from "../logics/Evade";
import { monitor, stopMonitor } from "../utils/MemoryAccessUtil";

export class General extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 2);

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
        // console.log(`zoom check:` + SHARED_MODULE.base.add(0x15FA188).readPointer().add(0x1BC).readFloat());
        // console.log(`15FA170: ` + SHARED_MODULE.base.add(0x15FA170).readFloat());
        // console.log(`currentCameraZoom: ` + IGAME.myPlayer.ptr.add(0x128).readU32());
        // console.log(`field_270: ` + IGAME.field_270);
        // console.log(`smthZoom: ` + IGAME.myPlayer.smthZoomTick);

        // OBJECT_MANAGER.heroes.forEach((h) => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     // for (let i = 0; i < 80; i++) {
        //     //     const tool = h.getTool(i);
        //     //     if (tool == null) continue;
        //     //     console.log(`tool ${i}: ${tool.typeName}`);
        //     // }
        // });

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     // if (!INPUT.isControlDown()) return;

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
    @Subscribe("DrawEvent")
    onDraw() {
        // const screenpos = CLIENT.worldToScreen(this.myHero.position);
        // const screenpos2 = CLIENT.worldToScreen(IGAME.mysteriousStruct.mousePosition);
        // // GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
        // for (let i = 0; i < 80; i++) {
        //     GRAPHICS.drawLine2d(screenpos, screenpos2);
        // }
    }
}
