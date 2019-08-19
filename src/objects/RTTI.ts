import { CObj } from "../honIdaStructs";

export class TypeInfo {
    public ptr: NativePointer;

    constructor(ptr: NativePointer) {
        this.ptr = ptr;
    }

    get typeName(): string {
        return this.ptr.add(0x8).readPointer().readCString() || "";
    }

    get implementations(): TypeInfo[] {
        let imps = []
        let offset = 0x10;
        let ptr = this.ptr.add(offset).readPointer();
        while(!ptr.isNull()) {
            imps.push(new TypeInfo(ptr));
            offset += 0x8;
            ptr = this.ptr.add(offset).readPointer();
        }
        return imps;
    }
}

export function tryGetTypeInfo(obj: CObj | NativePointer): TypeInfo | null {
    try {
        const ptr = (obj instanceof CObj) ? obj.ptr : obj;
        return new TypeInfo(ptr.readPointer().sub(0x8).readPointer());
    } catch (error) {
        return null;
    }
}