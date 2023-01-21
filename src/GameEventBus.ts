import { EventBus, Subscribe } from "eventbus-ts";
import { IGAME, K2_MODULE, SHARED_MODULE } from "./game/Globals";
import { IVisualEntity } from "./honIdaStructs";
import { OBJECT_MANAGER } from "./objects/ObjectManager";
import { tryGetTypeInfo } from "./objects/RTTI";
import { ON_MAIN_LOOP_OFFSET } from "./offests";
import { logCallTrace } from "./utils/StackTraceHelper";

class MainLoopEvent extends EventBus.Event<void> {}
class DrawEvent extends EventBus.Event<void> {}
class SendGameDataEvent extends EventBus.Event<NativePointer[]> {}
class SendClientSnapshotEvent extends EventBus.Event<NativePointer[]> {}
class RequestStartAnimEvent extends EventBus.Event<NativePointer[]> {}

const onMainLoop = K2_MODULE.base.add(ON_MAIN_LOOP_OFFSET); //  CHost::Execute contains main loop in K2
const onSceneRender = K2_MODULE.getExportByName("_ZN13CSceneManager6RenderEv");
const sendGameData = K2_MODULE.getExportByName("_ZN11CHostClient12SendGameDataERK7IBufferb");
const sendClientSnapshot = K2_MODULE.getExportByName("_ZN11CHostClient18SendClientSnapshotERK7IBuffer");
const onRequestStartAnim = K2_MODULE.getExportByName("_ZN9CSkeleton16RequestStartAnimERKNSt3__112basic_stringIwNS0_11char_traitsIwEE17K2StringAllocatorIwEEEjiifj");
const onSendHttpRequest = K2_MODULE.getExportByName("_ZN12CHTTPRequest11SendRequestERKNSt3__112basic_stringIcNS0_11char_traitsIcEE17K2StringAllocatorIcEEEbbb");
const onManagerSendHttpRequest = K2_MODULE.getExportByName("_ZN12CHTTPManager11SendRequestEP12CHTTPRequest");

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
    Interceptor.attach(onSendHttpRequest, {
        onEnter: function(args) {
            // logCallTrace(this.context);
            //Url = request + 48

            const urlStruct = args[1];

            console.log("Url: " + urlStruct.add(0x10).readPointer().readCString());

            const request = args[0];

            const argStart = request.add(0x58).readPointer();
            const argEnd = request.add(0x60).readPointer();

            console.log(argStart + " -> " + argEnd);

            let current = argStart;
            let i = 0;

            while (current.toString() != argEnd.toString() && i < 60) {
                i ++;

                const check = current.readU8();
                const key = ((check & 1) != 0) ? current.add(0x10).readCString() : current.add(0x1).readCString();
                const check2 = current.add(24).readU8();
                const valuePtr = ((check2 & 1) != 0) ? current.add(15 + 25).readPointer() : current.add(25);
                // const value = current.add(40).readPointer();

                if (key === "SysInfo") {
                    // Hardware ban bypass :)
                    // valuePtr.writeUtf8String("");
                    valuePtr.writeUtf8String("25084391224E35E4FC5FF52C886F16A628F65B8151814B9263126B4BA250DE1A%7C25084391224E35E4FC5FF52C886F16A628F65B8151814B9263126B4BA250DE1A%7C25084391224E35E4FC5FF52C886F16A628F65B8151814B9263126B4BA250DE1A%7C25084391224E35E4FC5FF52C886F16A628F65B8151814B9263126B4BA250DE1A%7C25084391224E35E4FC5FF52C886F16A628F65B8151814B9263126B4BA250DE1A");
                }

                console.log("key: " + key + " ->  val: " + valuePtr.readCString());
                current = current.add(0x30);
            }

        }
    });
    // Interceptor.attach(onManagerSendHttpRequest, {
    //     onEnter: function(args) {
    //         const request = args[1].readPointer();
    //         //Url = request + 48
    //         console.log("1: " + request.add(48));
    //         console.log("2: " + request.add(48).readPointer().readCString());

    //         // http header = 0xA8
    //     }
    // });
}

export function cancelEventListener() {
    Interceptor.detachAll();
}


