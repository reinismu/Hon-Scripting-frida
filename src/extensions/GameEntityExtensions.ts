import {
    IUnitEntity,
    IEntityItem,
    IEntityState,
    IEntityAbility,
    ISlaveEntity,
    IHeroEntity,
    IVisualEntity,
    IProjectile,
} from "../honIdaStructs";
import { tryGetTypeInfo } from "../objects/RTTI";
import { SHARED_MODULE, IGAME } from "../game/Globals";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Vec2, Vector2d } from "../utils/Vector";

const toolInitMap = new Map([
    [
        "11IEntityItem",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityItem(ptr);
        },
    ],
    [
        "12IEntityState",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityState(ptr);
        },
    ],
    [
        "14IEntityAbility",
        (ptr: NativePointer): ISlaveEntity => {
            return new IEntityAbility(ptr);
        },
    ],
]);

const magicImmunityStates = new Set([
    "State_Accursed_Ability4",
    "State_Jereziah_Ability2",
    "State_Item3E" /* Shrunken*/,
    "State_Predator_Ability2",
    "State_Hiro_Ability1" /* Swiftblade Q */,
    "State_Rhapsody_Ability4_Buff" /* Rhapsody ult Q */,
]);

const physicalImmunityStates = new Set(["State_Accursed_Ability4", "State_VoidTalisman", "State_Rhapsody_Ability4_Buff"]);

declare module "../honIdaStructs" {
    interface IUnitEntity {
        facingVector(deltaAngle?: number): Vec2;
        getMsToTurnToPos(pos: Vec2): number;
        turnAngle(pos: Vec2): number;
        isFacing(pos: Vec2 | IUnitEntity): boolean;
        getTool(index: number): ISlaveEntity | null;
        getItem(name: string): { index: number; item: IEntityItem } | null;
        isEnemy(entity: IUnitEntity): boolean;
        hasModifier(name: string): boolean;
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
        getManaPercent(): number;
        getManaRegen(): number;
        getMoveSpeed(smth: boolean): number; // use default 1
        getEvasionMelee(): number;
        getEvasionRanged(): number;
        getAttackSpeed(): number;
        getAttackRange(): number;
        getAdjustedAttackCooldown(): number;
        getAdjustedAttackActionTime(): number;
        getAdjustedAttackDuration(): number;
        callFloatVTable(offset: number): number;

        getFinalMinAttackDamage(): number;
        getFinalMaxAttackDamage(): number;
        getMinAttackDamage(): number;
        getMaxAttackDamage(): number;
        getAdditionalAttackDamage(): number;
        // Not sure if useful as it is allways true
        getCanAttack(): boolean;
        isMagicImmune(): boolean;
        isPhysicalImmune(): boolean;
        isInvulnerable(): boolean;
        isBarbed(): boolean;
        isStaffed(): boolean;
        isDisabled(): boolean;
        isDisarmed(): boolean;
        isSilenced(): boolean;
        isMelee(): boolean;
        isStealth(): boolean;
        hasTool(name: string): boolean;
        hasAnyOfTool(names: Set<string>): boolean;
        getEnemiesFightingMe(range: number): IHeroEntity[];
        getEnemiesInRange(range: number): IHeroEntity[];
        getAlliesInRange(range: number): IHeroEntity[];
        getAllAlliesInRange(range: number): IUnitEntity[];
        getAllEnemiesInRange(range: number): IUnitEntity[];
        getAllOthersInRange(range: number): IUnitEntity[];
    }

    interface IHeroEntity {
        isIllusion(): boolean;
    }

    interface IVisualEntity {
        getModelId(): number;
    }

    interface IProjectile {
        facingVector(): Vec2;
    }
}

function turnAngle(entity: IUnitEntity, pos: Vec2) {
    const faceVec = Vector2d.normalized(entity.facingVector());
    const targetVec = Vector2d.normalized(Vector2d.sub(pos, entity.position));
    return radianToDegree(Math.acos(Vector2d.dot(faceVec, targetVec)));
}

function radianToDegree(rad: number): number {
    return (rad * 180) / Math.PI;
}

IProjectile.prototype.facingVector = function (deltaAngle: number = 0): { x: number; y: number } {
    const self = this as IUnitEntity;
    const radians = (self.projectileAngle + deltaAngle) * 0.01745329252 + Math.PI / 2;
    return { x: Math.cos(radians), y: Math.sin(radians) };
};

IUnitEntity.prototype.turnAngle = function (pos: Vec2): number {
    const self = this as IUnitEntity;
    return turnAngle(self, pos);
};

IUnitEntity.prototype.callFloatVTable = function (offset: number): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(offset).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getFinalMinAttackDamage = function (): number {
    const self = this as IUnitEntity;
    const baseMinAttackDmg = self.getMinAttackDamage();
    const baseMaxAttackDmg = self.getMaxAttackDamage();
    const avgBaseAttackDmg = (baseMinAttackDmg + baseMaxAttackDmg) / 2;
    const additonalAttackDamage = self.getAdditionalAttackDamage();
    const baseAttackDmgModifier = self.callFloatVTable(0x848);
    const allAttackDmgModifier = self.callFloatVTable(0x858);
    return (avgBaseAttackDmg * baseAttackDmgModifier + additonalAttackDamage) * allAttackDmgModifier - avgBaseAttackDmg + baseMinAttackDmg;
};

IUnitEntity.prototype.getFinalMaxAttackDamage = function (): number {
    const self = this as IUnitEntity;
    const baseMinAttackDmg = self.getMinAttackDamage();
    const baseMaxAttackDmg = self.getMaxAttackDamage();
    const avgBaseAttackDmg = (baseMinAttackDmg + baseMaxAttackDmg) / 2;
    const additonalAttackDamage = self.getAdditionalAttackDamage();
    const baseAttackDmgModifier = self.callFloatVTable(0x848);
    const allAttackDmgModifier = self.callFloatVTable(0x858);
    return (avgBaseAttackDmg * baseAttackDmgModifier + additonalAttackDamage) * allAttackDmgModifier - avgBaseAttackDmg + baseMaxAttackDmg;
};

IUnitEntity.prototype.getMinAttackDamage = function (): number {
    const self = this as IUnitEntity;
    return self.callFloatVTable(0xd08);
};

IUnitEntity.prototype.getAdditionalAttackDamage = function (): number {
    const self = this as IUnitEntity;
    return self.callFloatVTable(0x868);
};

IUnitEntity.prototype.getMaxAttackDamage = function (): number {
    const self = this as IUnitEntity;
    return self.callFloatVTable(0xd10);
};

IUnitEntity.prototype.getMsToTurnToPos = function (pos: Vec2): number {
    const angle = turnAngle(this as IUnitEntity, pos);
    // TODO: implement turn rate
    return angle * 0.8; // Magic number TODO fix (Works okish)
};

IUnitEntity.prototype.isFacing = function (pos: Vec2 | IUnitEntity): boolean {
    const angle = turnAngle(this as IUnitEntity, pos instanceof IUnitEntity ? pos.position : pos);
    return angle < 75;
};

IUnitEntity.prototype.isMelee = function (): boolean {
    const self = this as IUnitEntity;
    return self.getAttackRange() < 210;
};

IVisualEntity.prototype.getModelId = function (): number {
    const self = this as IVisualEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x4c8).readPointer(), "int", ["pointer"])(self.ptr) as number;
};

IHeroEntity.prototype.isIllusion = function (): boolean {
    const self = this as IHeroEntity;
    const lowestNetId = OBJECT_MANAGER.getLowestHeroEntityId(self.typeName);
    if (!lowestNetId) {
        return false;
    }
    return self.networkId > lowestNetId;
};

IUnitEntity.prototype.getTool = function (index: number): ISlaveEntity | null {
    const self = this as IUnitEntity;
    const ptr = self.ptr.add(0x408 + index * 8).readPointer();
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

IUnitEntity.prototype.getItem = function (name: string): { index: number; item: IEntityItem } | null {
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

const isEnemyNative = new NativeFunction(SHARED_MODULE.getExportByName("_ZNK11IUnitEntity7IsEnemyEPS_"), "bool", ["pointer", "pointer"]);

IUnitEntity.prototype.isEnemy = function (entity: IUnitEntity): boolean {
    const self = this as IUnitEntity;
    return isEnemyNative(self.ptr, entity.ptr) as unknown as boolean;
};

const hasModifier = new NativeFunction(
    SHARED_MODULE.getExportByName("_ZNK11IGameEntity11HasModifierERKNSt3__112basic_stringIwNS0_11char_traitsIwEE17K2StringAllocatorIwEEE"),
    "bool",
    ["pointer", "pointer"]
);

IUnitEntity.prototype.hasModifier = function (name: string): boolean {
    const self = this as IUnitEntity;
    return hasModifier(self.ptr, Memory.allocUtf8String(name)) as unknown as boolean;
};

IUnitEntity.prototype.hasTool = function (name: string): boolean {
    const self = this as IUnitEntity;
    for (let i = 0; i < 80; i++) {
        const tool = self.getTool(i);
        if (tool == null) continue;
        if (name == tool.typeName) {
            return true;
        }
    }
    return false;
};

IUnitEntity.prototype.hasAnyOfTool = function (names: Set<string>): boolean {
    const self = this as IUnitEntity;
    for (let i = 0; i < 80; i++) {
        const tool = self.getTool(i);
        if (tool == null) continue;
        if (names.has(tool.typeName)) {
            return true;
        }
    }
    return false;
};

IUnitEntity.prototype.isStaffed = function (): boolean {
    const self = this as IUnitEntity;
    // TODO check for buff
    return self.hasAnyOfTool(new Set(["Item_Intelligence7", "Item_MastersLegacy", "State_MastersLegacy"]));
};

IUnitEntity.prototype.isDisabled = function (): boolean {
    const self = this as IUnitEntity;
    // TODO check for buff
    return self.hasAnyOfTool(
        new Set([
            "State_Stunned",
            "State_Item4K",
            "State_Maliken_Ability4_Fear",
            "State_Kenisis_Ability4_Modifier",
            "State_WitchSlayer_Ability2",
            "State_DoctorRepulsor_Ability2",
        ])
    );
};

IUnitEntity.prototype.isDisarmed = function (): boolean {
    const self = this as IUnitEntity;
    // TODO check for buff
    return self.hasAnyOfTool(new Set(["State_SpikedBola", "State_Vindicator_Ability1_Enemy"]));
};

IUnitEntity.prototype.isSilenced = function (): boolean {
    const self = this as IUnitEntity;
    // TODO check for buff
    return self.hasAnyOfTool(new Set(["State_Item5K"]));
};

IUnitEntity.prototype.isMagicImmune = function (): boolean {
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

IUnitEntity.prototype.isPhysicalImmune = function (): boolean {
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

IUnitEntity.prototype.isBarbed = function (): boolean {
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

IUnitEntity.prototype.isInvulnerable = function (): boolean {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x9d8).readPointer(), "bool", ["pointer"])(self.ptr) as unknown as boolean;
};

IUnitEntity.prototype.isDead = function (): boolean {
    const self = this as IUnitEntity;
    return self.isAlive != 1;
};

IUnitEntity.prototype.isStealth = function (): boolean {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0xae0).readPointer(), "bool", ["pointer", "long"])(
        self.ptr,
        1
    ) as unknown as boolean;
};

IUnitEntity.prototype.getArmor = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x720).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getArmorPercentage = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x700).readPointer(), "int", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getMagicArmorPercentage = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x710).readPointer(), "int", ["pointer"])(self.ptr) as number;
};

const getArmorDamageAdjustment = new NativeFunction(
    SHARED_MODULE.getExportByName("_ZNK14CGameMechanics24GetArmorDamageAdjustmentEjf"),
    "float",
    ["pointer", "int", "float"]
);

IUnitEntity.prototype.getPhysicalResistance = function (): number {
    const self = this as IUnitEntity;
    return getArmorDamageAdjustment(IGAME.gameMechanics.ptr, self.getArmorPercentage(), self.getArmor()) as number;
};

IUnitEntity.prototype.getMagicalResistance = function (): number {
    const self = this as IUnitEntity;
    return getArmorDamageAdjustment(IGAME.gameMechanics.ptr, self.getMagicArmorPercentage(), self.getMagicArmor()) as number;
};

IUnitEntity.prototype.getMagicArmor = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x728).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

// Gets how much physical damage must be done to kill
IUnitEntity.prototype.getCurrentPhysicalHealth = function (): number {
    const self = this as IUnitEntity;
    return self.health / (1 - self.getPhysicalResistance());
};

// Gets how much physical damage must be done to kill
IUnitEntity.prototype.getCurrentMagicalHealth = function (): number {
    const self = this as IUnitEntity;
    return self.health / (1 - self.getMagicalResistance());
};

IUnitEntity.prototype.getCurrentHealth = function (): number {
    const self = this as IUnitEntity;
    return self.health;
};

IUnitEntity.prototype.getHealthPercent = function (): number {
    const self = this as IUnitEntity;
    return (new NativeFunction(self.ptr.readPointer().add(0xa98).readPointer(), "float", ["pointer"])(self.ptr) as number) * 100;
};

IUnitEntity.prototype.getMaxHealth = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x680).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getHealthRegen = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x6a0).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getMana = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0xab8).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getMaxMana = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x6c0).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getManaPercent = function (): number {
    const self = this as IUnitEntity;
    return (self.getMana() * 100) / self.getMaxMana();
};

IUnitEntity.prototype.getManaRegen = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x6e0).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getMoveSpeed = function (smth: boolean = true): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x780).readPointer(), "float", ["pointer", "char"])(
        self.ptr,
        smth ? 1 : 0
    ) as number;
};

IUnitEntity.prototype.getEvasionMelee = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x988).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getEvasionRanged = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x978).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getAttackSpeed = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x7c8).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getAttackRange = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x7a8).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackCooldown = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x10e0).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackActionTime = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x10d0).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getAdjustedAttackDuration = function (): number {
    const self = this as IUnitEntity;
    return new NativeFunction(self.ptr.readPointer().add(0x10d8).readPointer(), "float", ["pointer"])(self.ptr) as number;
};

IUnitEntity.prototype.getCanAttack = function (): boolean {
    const self = this as IUnitEntity;
    return new NativeFunction(
        self.ptr
            .readPointer()
            .add(0xdf8) // wrong
            .readPointer(),
        "bool",
        ["pointer"]
    )(self.ptr) as unknown as boolean;
};

IUnitEntity.prototype.facingVector = function (deltaAngle: number = 0): { x: number; y: number } {
    const self = this as IUnitEntity;
    const radians = (self.facingAngle + deltaAngle) * 0.01745329252 + Math.PI / 2;
    return { x: Math.cos(radians), y: Math.sin(radians) };
};

IUnitEntity.prototype.getEnemiesFightingMe = function (range: number): IHeroEntity[] {
    const self = this as IUnitEntity;
    return self.getEnemiesInRange(range).filter((h) => h.isFacing(self));
};

IUnitEntity.prototype.getAllAlliesInRange = function (range: number): IUnitEntity[] {
    const self = this as IUnitEntity;
    const heroEnemies = OBJECT_MANAGER.heroes.filter(
        (h) => h !== self && h.health > 0 && !h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    const creepEnemies = OBJECT_MANAGER.creeps.filter(
        (h) => h !== self && h.health > 0 && !h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    const neutralEnemies = OBJECT_MANAGER.neutrals.filter(
        (h) => h !== self && h.health > 0 && !h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    return [...heroEnemies, ...creepEnemies, ...neutralEnemies];
};

IUnitEntity.prototype.getAllEnemiesInRange = function (range: number): IUnitEntity[] {
    const self = this as IUnitEntity;
    const heroEnemies = OBJECT_MANAGER.heroes.filter(
        (h) => h.health > 0 && h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    const creepEnemies = OBJECT_MANAGER.creeps.filter(
        (h) => h.health > 0 && h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    const neutralEnemies = OBJECT_MANAGER.neutrals.filter(
        (h) => h.health > 0 && h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
    return [...heroEnemies, ...creepEnemies, ...neutralEnemies];
};

IUnitEntity.prototype.getAllOthersInRange = function (range: number): IUnitEntity[] {
    const self = this as IUnitEntity;
    const heroEnemies = OBJECT_MANAGER.heroes.filter(
        (h) => h.ptr != self.ptr && h.health > 0 && !h.isIllusion() && h.position.distance2d(self.position) < range
    );
    const creepEnemies = OBJECT_MANAGER.creeps.filter(
        (h) => h.ptr != self.ptr && h.health > 0 && h.position.distance2d(self.position) < range
    );
    const neutralEnemies = OBJECT_MANAGER.neutrals.filter(
        (h) => h.ptr != self.ptr && h.health > 0 && h.position.distance2d(self.position) < range
    );
    return [...heroEnemies, ...creepEnemies, ...neutralEnemies];
};

IUnitEntity.prototype.getEnemiesInRange = function (range: number): IHeroEntity[] {
    const self = this as IUnitEntity;
    return OBJECT_MANAGER.heroes.filter(
        (h) => h.health > 0 && !h.isIllusion() && h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
};

IUnitEntity.prototype.getAlliesInRange = function (range: number): IHeroEntity[] {
    const self = this as IUnitEntity;
    return OBJECT_MANAGER.heroes.filter(
        (h) => self !== h && h.health > 0 && !h.isIllusion() && !h.isEnemy(self) && h.position.distance2d(self.position) < range
    );
};
