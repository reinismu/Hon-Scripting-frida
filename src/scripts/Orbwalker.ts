import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { tryGetTypeInfo } from "../objects/RTTI";

export class Orbwalker {
    private walker: IUnitEntity;

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    @Subscribe("EntitySpawnedEvent")
    onGameEntitySpawned(entity: IGameEntity){
        if(!(entity instanceof IProjectile)) {
            return;
        }
        console.log(`My hero pos ${this.walker.position.x} ${this.walker.position.y}`);
        console.log(`Projectile spawned ${entity.ptr}   ${entity.position.x}`);
    }

}