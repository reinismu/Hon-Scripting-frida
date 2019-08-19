import { CClientEntity, IGameEntity, IHeroEntity, IUnitEntity, IGame } from "../honIdaStructs";
import { tryGetTypeInfo } from "./RTTI";
import { CLIENT_ENTITY_ARRAY, CLIENT_ENTITY_ARRAY_SIZE, IGAME } from "../game/Globals";

const CLIENT_ENTITY_SIZE = 0x930;

export class ObjectManager {
    private arrayPtr: NativePointer;
    private arraySizePtr: NativePointer;
    private iGame: IGame;

    private cachedEntities: IGameEntity[] = [];
    private cachedHeroes: IHeroEntity[] = [];
    private cachedMyHero: IHeroEntity | null = null;

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
        this.cachedEntities = [];
        this.cachedHeroes = [];
        this.cachedMyHero = null;

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
                if (gameEntity.networkId == this.iGame.myPlayer.heroNetworkId) {
                    this.cachedMyHero = gameEntity;
                }
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

    get myHero(): IHeroEntity {
        if (this.cachedMyHero == null) {
            throw Error("My hero not found");
        }
        return this.cachedMyHero;
    }

    // public heroes():  {

    // }
}

export const OBJECT_MANAGER = new ObjectManager(CLIENT_ENTITY_ARRAY.readPointer(), CLIENT_ENTITY_ARRAY_SIZE, IGAME);