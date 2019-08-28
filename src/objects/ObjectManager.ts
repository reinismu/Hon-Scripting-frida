import { CClientEntity, IGameEntity, IHeroEntity, IUnitEntity, IGame, ICreepEntity, INeutralEntity, IProjectile, IGadgetEntity } from "../honIdaStructs";
import { tryGetTypeInfo } from "./RTTI";
import { CLIENT_ENTITY_ARRAY, CLIENT_ENTITY_ARRAY_SIZE, IGAME } from "../game/Globals";
import { EventBus } from "eventbus-ts";
import { Event } from "eventbus-ts/dist/Event";

const CLIENT_ENTITY_SIZE = 0x930;

class EntitySpawnedEvent extends EventBus.Event<IGameEntity> {}
class EntityDespawnedEvent extends EventBus.Event<number> {}

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;
    private iGame: IGame;

    private cachedMyHero: IHeroEntity | null = null;

    private cachedEntityMap: Map<number, IGameEntity> = new Map();
    private cachedHeroMap: Map<number, IHeroEntity> = new Map();
    private cachedCreepMap: Map<number, ICreepEntity> = new Map();
    private cachedNeutralMap: Map<number, INeutralEntity> = new Map();
    private cachedGadgetMap: Map<number, IGadgetEntity> = new Map();
    /**
     * Idea is that lowest network id for same hero will be the real one.
     */
    private illusionCheckMap: Map<string, number> = new Map();

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
                return new ICreepEntity(ptr);
            }
        ],
        [
            "14INeutralEntity",
            (ptr: NativePointer): IGameEntity => {
                return new INeutralEntity(ptr);
            }
        ],
        [
            "11IProjectile",
            (ptr: NativePointer): IGameEntity => {
                return new IProjectile(ptr);
            }
        ],
        [
            "13IGadgetEntity",
            (ptr: NativePointer): IGameEntity => {
                return new IGadgetEntity(ptr);
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
        const events = [];
        for (const clientEntity of this.clientEntities()) {
            const event = this.checkEntity(clientEntity, index);
            if(event) {
                events.push(event);
            }
            index++;
        }
        events.forEach(e => EventBus.getDefault().post(e));
    }

    public checkEntity(clientEntity: CClientEntity, index: number): Event<any> | null {
        let gameEntityPtr = clientEntity.ptr.add(0x8e8).readPointer();
        if (gameEntityPtr.isNull()) {
            this.cachedEntityMap.delete(index);
            this.cachedHeroMap.delete(index);
            this.cachedCreepMap.delete(index);
            this.cachedNeutralMap.delete(index);
            this.cachedGadgetMap.delete(index);
            return new EntityDespawnedEvent(index);
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
                    const currentId = this.illusionCheckMap.get(newEntity.typeName);
                    if (!currentId || newEntity.networkId < currentId) {
                        this.illusionCheckMap.set(newEntity.typeName, newEntity.networkId);
                    }
                } else if (newEntity instanceof ICreepEntity) {
                    this.cachedCreepMap.set(index, newEntity);
                } else if (newEntity instanceof INeutralEntity) {
                    this.cachedNeutralMap.set(index, newEntity);
                } else if (newEntity instanceof IGadgetEntity) {
                    this.cachedGadgetMap.set(index, newEntity);
                }
                return new EntitySpawnedEvent(newEntity);
            } else {
                this.cachedEntityMap.delete(index);
                this.cachedHeroMap.delete(index);
                this.cachedCreepMap.delete(index);
                this.cachedNeutralMap.delete(index);
                this.cachedGadgetMap.delete(index);
                return new EntityDespawnedEvent(index);
            }
        }
        return null;
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

    get creeps(): ICreepEntity[] {
        return Array.from(this.cachedCreepMap.values());
    }

    get neutrals(): INeutralEntity[] {
        return Array.from(this.cachedNeutralMap.values());
    }

    get gadgets(): IGadgetEntity[] {
        return Array.from(this.cachedGadgetMap.values());
    }

    get myHero(): IHeroEntity {
        if (this.cachedMyHero == null) {
            throw Error("My hero not found");
        }
        return this.cachedMyHero;
    }

    getLowestHeroEntityId(typeName: string): number | null {
        return this.illusionCheckMap.get(typeName) || null;
    }
}

export const OBJECT_MANAGER = new ObjectManager(CLIENT_ENTITY_ARRAY, CLIENT_ENTITY_ARRAY_SIZE, IGAME);
