import { K2_MODULE } from "../game/Globals";
import "../extensions/NativePointerExtensions";

const getNumAnims = new NativeFunction(K2_MODULE.getExportByName("_ZN16CResourceManager11GetNumAnimsEj"), "int", ["pointer", "int"]);
const getAnimName = new NativeFunction(K2_MODULE.getExportByName("_ZN16CResourceManager11GetAnimNameEjj"), "pointer", [
    "pointer",
    "int",
    "int"
]);

class ResourceManager {
    private resourceManagerPtr = K2_MODULE.getExportByName("g_ResourceManager").readPointer();

    getModelAnimationCount(modelId: number) {
        return getNumAnims(this.resourceManagerPtr, modelId) as number;
    }

    getAnimName(modelId: number, animId: number): string {
        const namePtr = getAnimName(this.resourceManagerPtr, modelId, animId) as NativePointer;
        console.log(`Anim name ptr: ${namePtr}`);
        return namePtr.read32BitString();
    }
}

export const RESOURCE_MANAGER = new ResourceManager();
