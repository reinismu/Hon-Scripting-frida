import { IEntityTool, IGameEntity } from "../honIdaStructs";
import { SHARED_MODULE } from "../game/Globals";
import { tryGetTypeInfo } from "../objects/RTTI";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

const isReady = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IEntityTool7IsReadyEv"), "bool", ["pointer"]);
const getDynamicRange = new NativeFunction(SHARED_MODULE.getExportByName("_ZN11IEntityTool15GetDynamicRangeEb"), "float", [
    "pointer",
    "bool"
]);

declare module "../honIdaStructs" {
    interface IEntityTool {
        isReady(): boolean;
        isActive(): boolean;
        getOwner(): IGameEntity | null;
        canActivate(): boolean;
        getDynamicRange(): number;
        getActivateManaCost(): number;
        getManaCost(): number;
        getCastTime(): number;
        getAdjustedCastTime(): number;
        getCastActionTime(): number;
        getAdjustedActionTime(): number;
        getCharges(): number;
    }
}

IEntityTool.prototype.isReady = function(): boolean {
    const self = this as IEntityTool;
    return isReady(self.ptr)  as unknown as boolean;
};

IEntityTool.prototype.isActive = function(): boolean {
    const self = this as IEntityTool;
    return (self.allign & 1) === 1;
};
// 0x15C58E8 - 
IEntityTool.prototype.canActivate = function(): boolean {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xe18)
            .readPointer(),
        "bool",
        ["pointer"]
    )(self.ptr)  as unknown as boolean;
};

IEntityTool.prototype.getOwner = function(): IGameEntity | null {
    const self = this as IEntityTool;

    return OBJECT_MANAGER.createGameEntity(new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x3E0)
            .readPointer(),
        "pointer",
        ["pointer"]
    )(self.ptr) as NativePointer)
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

IEntityTool.prototype.getCastTime = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xAF8)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getAdjustedCastTime = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x9E8)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getCastActionTime = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xB40)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getAdjustedActionTime = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x9E0)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};


IEntityTool.prototype.getCharges = function(): number {
    const self = this as IEntityTool;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x4E0)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IEntityTool.prototype.getDynamicRange = function(getStatic: boolean = false): number {
    const self = this as IEntityTool;
    return getDynamicRange(self.ptr, getStatic ? 1 : 0) as number;
};
