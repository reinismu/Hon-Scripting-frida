import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";

export class TestScript extends Script {
    constructor() {
        super();
        console.log("register event bus");
        EventBus.getDefault().register(this);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        // console.log("loop");
    }

    @Subscribe("DrawEvent")
    onDraw() {
        GRAPHICS.drawRect(0,0,100,100);
        // console.log("draw");
    }
}
