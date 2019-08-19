import { IUnitEntity, IEntityItem, IEntityState, IEntityAbility, ISlaveEntity } from "../honIdaStructs";
import { tryGetTypeInfo } from "../objects/RTTI";
import { SHARED_MODULE } from "../game/Globals";

const toolInitMap = new Map([
    [
        "11IEntityItem",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityItem(ptr);
        }
    ],
    [
        "12IEntityState",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityState(ptr);
        }
    ],
    [
        "14IEntityAbility",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityAbility(ptr);
        }
    ]
]);

declare module "../honIdaStructs" {
    interface IUnitEntity {
        getTool(index: number): ISlaveEntity;
        isEnemy(entity: IUnitEntity): boolean;
    }
}

IUnitEntity.prototype.getTool = function(index: number): ISlaveEntity {
    const self = this as IUnitEntity;
    const ptr = self.ptr.add(0x400 + index * 8).readPointer();
    const type = tryGetTypeInfo(ptr);
    if (type) {
        const creator = toolInitMap.get(type.typeName);
        if(creator) {
            return creator(ptr);
        }
    }
    return new ISlaveEntity(ptr);
};

const isEnemy = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IUnitEntity7IsEnemyEPS_"), "bool", ["pointer", "pointer"]);

IUnitEntity.prototype.isEnemy = function(entity: IUnitEntity): boolean {
    const self = this as IUnitEntity;
    return isEnemy(self.ptr, entity.ptr) as boolean;
};
