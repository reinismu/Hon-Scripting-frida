import { EventBus, Subscribe } from "eventbus-ts";
import { K2_MODULE } from "./game/Globals";

class MainLoopEvent extends EventBus.Event<void> {}
class DrawEvent extends EventBus.Event<void> {}

const onMainLoop = K2_MODULE.base.add(0x0005dae30); //  CHost::Execute contains main loop in K2
const onSceneRender = K2_MODULE.getExportByName("_ZN13CSceneManager6RenderEv");

export function initEventListener() {
    Interceptor.attach(onMainLoop, {
        onLeave: function(args) {
            EventBus.getDefault().post(new MainLoopEvent());
        }
    });
    Interceptor.attach(onSceneRender, {
        onLeave: function(args) {
            EventBus.getDefault().post(new DrawEvent());
        }
    });
}

export function cancelEventListener() {
    Interceptor.detachAll();
}

