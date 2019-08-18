import { CClientEntity } from "../honIdaStructs";

const CLIENT_ENTITY_SIZE = 0x930;

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;

    constructor(arrayPtr: NativePointer, arraySizePtr: NativePointer) {
        this.arrayPtr = arrayPtr;
        this.arraySizePtr = arraySizePtr;
    }

    get entitiesCount(): number {
		return this.arraySizePtr.readInt();
	}

    public clientEntities(): CClientEntity[] {
        let i = 0;
        let size = this.arraySizePtr.readInt();
        const entities = [];
        while (i < size) {
            entities.push(new CClientEntity(this.arrayPtr.add(i * CLIENT_ENTITY_SIZE)));
            i++;
        }
        return entities;
    }

    // public heroes():  {

    // }
}
