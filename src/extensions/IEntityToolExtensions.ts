import { IEntityTool } from "../honIdaStructs";
import { SHARED_MODULE } from "../game/Globals";

const isReady = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IEntityTool7IsReadyEv"), "bool", ["pointer"]);
const getDynamicRange = new NativeFunction(SHARED_MODULE.getExportByName("_ZN11IEntityTool15GetDynamicRangeEb"), "float", [
    "pointer",
    "bool"
]);

declare module "../honIdaStructs" {
    interface IEntityTool {
        isReady(): boolean;
        canActivate(): boolean;
        getDynamicRange(): number;
        getActivateManaCost(): number;
        getManaCost(): number;
    }
}

IEntityTool.prototype.isReady = function(): boolean {
    const self = this as IEntityTool;
    return isReady(self.ptr) as boolean;
};

IEntityTool.prototype.canActivate = function(): boolean {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xe00)
            .readPointer(),
        "bool",
        ["pointer"]
    )(self.ptr) as boolean;
};

IEntityTool.prototype.getActivateManaCost = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xB18)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getManaCost = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xA70)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getDynamicRange = function(getStatic: boolean = false): number {
    const self = this as IEntityTool;
    return getDynamicRange(self.ptr, getStatic ? 1 : 0) as number;
};
