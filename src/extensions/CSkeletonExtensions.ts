import { CSkeleton } from "../honIdaStructs";
import { SHARED_MODULE } from "../game/Globals";
import "../extensions/NativePointerExtensions";

const getCurrentAnimName = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK9CSkeleton18GetCurrentAnimNameEi"), "pointer", [
    "pointer",
    "int"
]);

const getCurrentAnimIndex = new NativeFunction(SHARED_MODULE.getExportByName("_ZN9CSkeleton12GetAnimIndexEi"), "int", [
    "pointer",
    "int"
]);

declare module "../honIdaStructs" {
    interface CSkeleton {
        getCurrentAnimName(): string;
        getCurrentAnimIndex(): number;
    }
}

CSkeleton.prototype.getCurrentAnimName = function(indexSmth: number = 0): string {
    const self = this as CSkeleton;
    const ptr = getCurrentAnimName(self.ptr, indexSmth) as NativePointer;
    return ptr.read32BitString();
};

CSkeleton.prototype.getCurrentAnimIndex = function(indexSmth: number = 0): number {
    const self = this as CSkeleton;
    return getCurrentAnimIndex(self.ptr, indexSmth) as number;
};
