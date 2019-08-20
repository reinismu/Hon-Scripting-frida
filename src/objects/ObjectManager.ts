import { CClientEntity, IGameEntity, IHeroEntity, IUnitEntity, IGame } from "../honIdaStructs";
import { tryGetTypeInfo } from "./RTTI";
import { CLIENT_ENTITY_ARRAY, CLIENT_ENTITY_ARRAY_SIZE, IGAME } from "../game/Globals";

const CLIENT_ENTITY_SIZE = 0x930;

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;
    private iGame: IGame;

    private cachedMyHero: IHeroEntity | null = null;

    private cachedEntityMap: Map<number, IGameEntity> = new Map();
    private cachedHeroMap: Map<number, IHeroEntity> = new Map();

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

    constructor(arrayPtr: NativePointer, arraySizePtr: NativePointer, iGame: IGame) {
        this.arrayPtr = arrayPtr;
        this.arraySizePtr = arraySizePtr;
        this.iGame = iGame;
    }

    get entitiesCount(): number {
        return this.arraySizePtr.readInt();
    }

    public refreshCache() {
        let index = 0;
        for (const clientEntity of this.clientEntities()) {
            this.checkEntity(clientEntity, index);
            index++;
        }
    }

    public checkEntity(clientEntity: CClientEntity, index: number) {
        let gameEntityPtr = clientEntity.ptr.add(0x8e8).readPointer();
        if (gameEntityPtr.isNull()) {
            this.cachedEntityMap.delete(index);
            this.cachedHeroMap.delete(index);
            return;
        }
        const cachedEntity = this.cachedEntityMap.get(index);
        if (!cachedEntity || !cachedEntity.ptr.equals(gameEntityPtr)) {
            const newEntity = this.createGameEntity(gameEntityPtr);
            if (newEntity != null) {
                this.cachedEntityMap.set(index, newEntity);
                if (newEntity instanceof IHeroEntity) {
                    this.cachedHeroMap.set(index, newEntity);
                    if (newEntity.networkId == this.iGame.myPlayer.heroNetworkId) {
                        this.cachedMyHero = newEntity;
                    }
                }
            } else {
                this.cachedEntityMap.delete(index);
                this.cachedHeroMap.delete(index);
            }
        }
    }

    public createGameEntity(gameEntityPtr: NativePointer): IGameEntity | null {
        if (gameEntityPtr.isNull()) {
            return null;
        }
        const typeInfo = tryGetTypeInfo(gameEntityPtr);
        if (typeInfo == null) {
            return null;
        }
        try {
            const entityCreator = this.entityInitMap.get(typeInfo.typeName);
            if (entityCreator !== undefined) {
                return entityCreator(gameEntityPtr);
            } else {
                return new IGameEntity(gameEntityPtr);
            }
        } catch (ex) {
            console.log(`Error creating entity with ptr: ${gameEntityPtr}`);
        }
        return null;
    }

    public clientEntities(): CClientEntity[] {
        let i = 0;
        let size = this.arraySizePtr.readInt();
        const entities = [];
        while (i < size) {
            entities.push(new CClientEntity(this.arrayPtr.readPointer().add(i * CLIENT_ENTITY_SIZE)));
            i++;
        }
        return entities;
    }

    get heroes(): IHeroEntity[] {
        return Array.from(this.cachedHeroMap.values());
    }

    get entities(): IGameEntity[] {
        return Array.from(this.cachedEntityMap.values());
    }

    get myHero(): IHeroEntity {
        if (this.cachedMyHero == null) {
            throw Error("My hero not found");
        }
        return this.cachedMyHero;
    }
}

export const OBJECT_MANAGER = new ObjectManager(CLIENT_ENTITY_ARRAY, CLIENT_ENTITY_ARRAY_SIZE, IGAME);
