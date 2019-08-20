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
        getCurrentHealth(): number;
        getMaxHealth(): number;
        getHealthPercent(): number;
        getHealthRegen(): number;
        getMana(): number;
        getMaxMana(): number;
        getManaRegen(): number;
        getMoveSpeed(smth: boolean): number;
        getEvasionMelee(): number;
        getEvasionRanged(): number;
    }
}

IUnitEntity.prototype.getTool = function(index: number): ISlaveEntity {
    const self = this as IUnitEntity;
    const ptr = self.ptr.add(0x400 + index * 8).readPointer();
    const type = tryGetTypeInfo(ptr);
    if (type) {
        const creator = toolInitMap.get(type.typeName);
        if (creator) {
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

IUnitEntity.prototype.getCurrentHealth = function(): number {
    const self = this as IUnitEntity;
    return self.health;
};

IUnitEntity.prototype.getHealthPercent = function(): number {
    const self = this as IUnitEntity;
    return (
        (new NativeFunction(
            self.ptr
                .readPointer()
                .add(0xa88)
                .readPointer(),
            "float",
            ["pointer"]
        )(self.ptr) as number) * 100
    );
};

IUnitEntity.prototype.getMaxHealth = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x680)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getHealthRegen = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x6a0)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getMana = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xaa8)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getMaxMana = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x6c0)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getManaRegen = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x6e0)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getMoveSpeed = function(smth: boolean = true): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x780)
            .readPointer(),
        "float",
        ["pointer", "boolean"]
    )(self.ptr, smth ? 1 : 0) as number;
};

IUnitEntity.prototype.getEvasionMelee = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x978)
            .readPointer(),
        "float",
        ["pointer", ]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getEvasionRanged = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x968)
            .readPointer(),
        "float",
        ["pointer", ]
    )(self.ptr) as number;
};
