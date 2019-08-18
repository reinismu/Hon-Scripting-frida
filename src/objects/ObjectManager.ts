import { CClientEntity, IGameEntity, IHeroEntity, IUnitEntity } from "../honIdaStructs";
import { tryGetTypeInfo } from "./RTTI";

const CLIENT_ENTITY_SIZE = 0x930;

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;

    private cachedEntities: IGameEntity[] = [];
    private cachedHeroes: IHeroEntity[] = [];

    private entityInitMap = new Map([
        [
            "11IHeroEntity",
            (ptr: NativePointer): IGameEntity => {
                return new IHeroEntity(ptr);
            }
        ],
        [
            "15IBuildingEntity",
            (ptr: NativePointer): IGameEntity => {
                return new IUnitEntity(ptr);
            }
        ],
        [
            "12ICreepEntity",
            (ptr: NativePointer): IGameEntity => {
                return new IUnitEntity(ptr);
            }
        ]
    ]);

    constructor(arrayPtr: NativePointer, arraySizePtr: NativePointer) {
        this.arrayPtr = arrayPtr;
        this.arraySizePtr = arraySizePtr;
    }

    get entitiesCount(): number {
        return this.arraySizePtr.readInt();
    }

    public refreshCache() {
        this.cachedEntities = [];
        this.cachedHeroes = [];

        for (const clientEntity of this.clientEntities()) {
            let gameEntity = clientEntity.gameEntity2;
            const typeInfo = tryGetTypeInfo(gameEntity);
            if (typeInfo == null) continue;
            const entityCreator = this.entityInitMap.get(typeInfo.typeName);
            if (entityCreator !== undefined) {
                gameEntity = entityCreator(gameEntity.ptr);
            }
            if (gameEntity instanceof IHeroEntity) {
                this.cachedHeroes.push(gameEntity);
            }
            this.cachedEntities.push(gameEntity);
        }
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

    get heroes(): IHeroEntity[] {
        return this.cachedHeroes;
    }

    // public heroes():  {

    // }
}
