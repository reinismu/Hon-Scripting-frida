import { EventBus, Subscribe } from "eventbus-ts";
import { K2_MODULE } from "./game/Globals";
import { OBJECT_MANAGER } from "./objects/ObjectManager";

class MainLoopEvent extends EventBus.Event<void> {}
class DrawEvent extends EventBus.Event<void> {}
class SendGameDataEvent extends EventBus.Event<NativePointer[]> {}
class SendClientSnapshotEvent extends EventBus.Event<NativePointer[]> {}
class RequestStartAnimEvent extends EventBus.Event<NativePointer[]> {}

const onMainLoop = K2_MODULE.base.add(0x5e3320); //  CHost::Execute contains main loop in K2
const onSceneRender = K2_MODULE.getExportByName("_ZN13CSceneManager6RenderEv");
const sendGameData = K2_MODULE.getExportByName("_ZN11CHostClient12SendGameDataERK7IBufferb");
const sendClientSnapshot = K2_MODULE.getExportByName("_ZN11CHostClient18SendClientSnapshotERK7IBuffer");
const onRequestStartAnim = K2_MODULE.getExportByName("_ZN9CSkeleton16RequestStartAnimERKNSt3__112basic_stringIwNS0_11char_traitsIwEE17K2StringAllocatorIwEEEjiifj");

export function initEventListener() {
    Interceptor.attach(onMainLoop, {
        onLeave: function(args) {
            OBJECT_MANAGER.refreshCache();
            EventBus.getDefault().post(new MainLoopEvent());
        }
    });
    Interceptor.attach(onSceneRender, {
        onLeave: function(args) {
            EventBus.getDefault().post(new DrawEvent());
        }
    });
    Interceptor.attach(sendGameData, {
        onEnter: function(args) {
            EventBus.getDefault().post(new SendGameDataEvent(args));
        }
    });
    Interceptor.attach(sendClientSnapshot, {
        onEnter: function(args) {
            EventBus.getDefault().post(new SendClientSnapshotEvent(args));
        }
    });
    Interceptor.attach(onRequestStartAnim, {
        onEnter: function(args) {
            EventBus.getDefault().post(new RequestStartAnimEvent(args));
        }
    });
}

export function cancelEventListener() {
    Interceptor.detachAll();
}
