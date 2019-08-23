import { IUnitEntity, IEntityItem, IEntityState, IEntityAbility, ISlaveEntity, IHeroEntity, IVisualEntity } from "../honIdaStructs";
import { tryGetTypeInfo } from "../objects/RTTI";
import { SHARED_MODULE, IGAME } from "../game/Globals";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

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

const magicImmunityStates = new Set([
    "State_Accursed_Ability4",
    "State_Jereziah_Ability2",
    "State_Item3E" /* Shrunken*/,
    "State_Predator_Ability2",
    "State_Hiro_Ability1" /* Swiftblade Q */
]);

const physicalImmunityStates = new Set(["State_Accursed_Ability4", "State_VoidTalisman"]);

declare module "../honIdaStructs" {
    interface IUnitEntity {
        facingVector(): { x: number; y: number };
        getTool(index: number): ISlaveEntity | null;
        getItem(name: string): { index: number; item: IEntityItem } | null;
        isEnemy(entity: IUnitEntity): boolean;
        isDead(): boolean;
        getArmor(): number;
        getArmorPercentage(): number;
        getPhysicalResistance(): number;
        getMagicalResistance(): number;
        getMagicArmor(): number;
        getMagicArmorPercentage(): number;
        getCurrentPhysicalHealth(): number;
        getCurrentMagicalHealth(): number;
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
        getAttackSpeed(): number;
        getAttackRange(): number;
        getAdjustedAttackCooldown(): number;
        getAdjustedAttackActionTime(): number;
        getAdjustedAttackDuration(): number;
        // Not sure if useful as it is allways true
        getCanAttack(): boolean;
        isMagicImmune(): boolean;
        isPhysicalImmune(): boolean;
        isMagicImmune(): boolean;
        isInvulnerable(): boolean;
        isBarbed(): boolean;
    }

    interface IHeroEntity {
        isIllusion(): boolean;
    }

    interface IVisualEntity {
        getModelId(): number;
    }
}

IVisualEntity.prototype.getModelId = function(): number {
    const self = this as IVisualEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x4c8)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IHeroEntity.prototype.isIllusion = function(): boolean {
    const self = this as IHeroEntity;
    const lowestNetId = OBJECT_MANAGER.getLowestHeroEntityId(self.typeName);
    if (!lowestNetId) {
        return false;
    }
    return self.networkId > lowestNetId;
};

IUnitEntity.prototype.getTool = function(index: number): ISlaveEntity | null {
    const self = this as IUnitEntity;
    const ptr = self.ptr.add(0x400 + index * 8).readPointer();
    if (ptr.isNull()) return null;
    const type = tryGetTypeInfo(ptr);
    if (type) {
        const creator = toolInitMap.get(type.typeName);
        if (creator) {
            return creator(ptr);
        }
    }
    return new ISlaveEntity(ptr);
};

IUnitEntity.prototype.getItem = function(name: string): { index: number; item: IEntityItem } | null {
    const self = this as IUnitEntity;
    for (let i = 48; i < 66; i++) {
        const tool = self.getTool(i);
        if (!tool) {
            continue;
        }
        if (tool instanceof IEntityItem && tool.typeName == name) {
            return { index: i, item: tool };
        }
    }
    return null;
};

const isEnemy = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IUnitEntity7IsEnemyEPS_"), "bool", ["pointer", "pointer"]);

IUnitEntity.prototype.isEnemy = function(entity: IUnitEntity): boolean {
    const self = this as IUnitEntity;
    return isEnemy(self.ptr, entity.ptr) as boolean;
};

IUnitEntity.prototype.isMagicImmune = function(): boolean {
    const self = this as IUnitEntity;
    for (let i = 0; i < 80; i++) {
        const tool = self.getTool(i);
        if (tool == null) continue;
        if (magicImmunityStates.has(tool.typeName)) {
            return true;
        }
    }
    return false;
};

IUnitEntity.prototype.isPhysicalImmune = function(): boolean {
    const self = this as IUnitEntity;
    for (let i = 0; i < 80; i++) {
        const tool = self.getTool(i);
        if (tool == null) continue;
        if (physicalImmunityStates.has(tool.typeName)) {
            return true;
        }
    }
    return false;
};

IUnitEntity.prototype.isBarbed = function(): boolean {
    const self = this as IUnitEntity;
    for (let i = 0; i < 80; i++) {
        const tool = self.getTool(i);
        if (tool == null) continue;
        if ("State_Excruciator" == tool.typeName) {
            return true;
        }
    }
    return false;
};

IUnitEntity.prototype.isInvulnerable = function(): boolean {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x9C8)
            .readPointer(),
        "bool",
        ["pointer"]
    )(self.ptr) as boolean;
};

IUnitEntity.prototype.isDead = function(): boolean {
    const self = this as IUnitEntity;
    return self.isAlive != 1;
};

IUnitEntity.prototype.getArmor = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x720)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getArmorPercentage = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x700)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getMagicArmorPercentage = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x710)
            .readPointer(),
        "int",
        ["pointer"]
    )(self.ptr) as number;
};

const getArmorDamageAdjustment = new NativeFunction(
    SHARED_MODULE.getExportByName("_ZNK14CGameMechanics24GetArmorDamageAdjustmentEjf"),
    "float",
    ["pointer", "int", "float"]
);

IUnitEntity.prototype.getPhysicalResistance = function(): number {
    const self = this as IUnitEntity;
    return getArmorDamageAdjustment(IGAME.gameMechanics.ptr, self.getArmorPercentage(), self.getArmor()) as number;
};

IUnitEntity.prototype.getMagicalResistance = function(): number {
    const self = this as IUnitEntity;
    return getArmorDamageAdjustment(IGAME.gameMechanics.ptr, self.getMagicArmorPercentage(), self.getMagicArmor()) as number;
};

IUnitEntity.prototype.getMagicArmor = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x728)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

// Gets how much physical damage must be done to kill
IUnitEntity.prototype.getCurrentPhysicalHealth = function(): number {
    const self = this as IUnitEntity;
    return self.health / (1 - self.getPhysicalResistance());
};

// Gets how much physical damage must be done to kill
IUnitEntity.prototype.getCurrentMagicalHealth = function(): number {
    const self = this as IUnitEntity;
    return self.health / (1 - self.getMagicalResistance());
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
        ["pointer"]
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
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getAttackSpeed = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x7C8)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getAttackRange = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x7A8)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackCooldown = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x10D0)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackActionTime = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x10C0)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackDuration = function(): number {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0x10C8)
            .readPointer(),
        "float",
        ["pointer"]
    )(self.ptr) as number;
};

IUnitEntity.prototype.getCanAttack = function(): boolean {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xDF8)
            .readPointer(),
        "bool",
        ["pointer"]
    )(self.ptr) as boolean;
};

IUnitEntity.prototype.facingVector = function(): { x: number; y: number } {
    const self = this as IUnitEntity;
    const radians = self.facingAngle * 0.01745329252 + Math.PI / 2;
    return { x: Math.cos(radians), y: Math.sin(radians) };
};
