import { IEntityTool } from "../honIdaStructs";
import { SHARED_MODULE } from "../game/Globals";

const isReady = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IEntityTool7IsReadyEv"), "bool", ["pointer"]);

declare module "../honIdaStructs" {
    interface IEntityTool {
        isReady(): boolean;
    }
}

IEntityTool.prototype.isReady = function(): boolean {
    const self = this as IEntityTool;
    return isReady(self.ptr) as boolean;
};
