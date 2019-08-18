import { CClientEntity } from "../honIdaStructs";

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;

    constructor(arrayPtr: NativePointer, arraySizePtr: NativePointer) {
        this.arrayPtr = arrayPtr;
        this.arraySizePtr = arraySizePtr;
    }

    public entities(): CClientEntity[] {
        var i = 0;
        var size = this.arraySizePtr.readInt();
        const entities = [];
        while (i < size) {
            entities.push(new CClientEntity(this.arrayPtr.add(i * 8).readPointer()));
        }
        return entities;
    }
}
