import { IHeroEntity, IUnitEntity } from "../honIdaStructs";
import "../extensions/GameEntityExtensions";
import "../extensions/CVec3Extensions";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Vec2 } from "../utils/Vector";

export class TargetSelector {
    getClosestEnemyHero(): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes
            .filter((h) => !h.isDead() && h.isEnemy(me))
            .sort((h1, h2) => h1.position.distance2dSqr(me.position) - h2.position.distance2dSqr(me.position))[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getEasiestPhysicalKillInRange(
        range: number,
        fromPosition: Vec2 = OBJECT_MANAGER.myHero.position,
        customPredicate: (h: IHeroEntity) => boolean = () => true,
        rangeOverride: (h: IHeroEntity, currentRange: number) => number = (h: IHeroEntity, currentRange: number) => currentRange
    ): IHeroEntity | null {
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                (h) =>
                    h.health > 0 &&
                    !h.isIllusion() &&
                    h.isEnemy(OBJECT_MANAGER.myHero) &&
                    h.position.distance2d(fromPosition) < rangeOverride(h, range) &&
                    !h.isPhysicalImmune() &&
                    !h.isInvulnerable() &&
                    !isBarbedWithHp(h) &&
                    customPredicate(h)
            )
            .sort((h1, h2) => h1.getCurrentPhysicalHealth() - h2.getCurrentPhysicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getEasiestMagicalKillInRange(
        range: number,
        from: IUnitEntity = OBJECT_MANAGER.myHero,
        customPredicate: (h: IHeroEntity) => boolean = () => true
    ): IHeroEntity | null {
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                (h) =>
                    h.health > 0 &&
                    !h.isIllusion() &&
                    h.isEnemy(from) &&
                    h.position.distance2d(from.position) < range &&
                    !h.isMagicImmune() &&
                    !h.isInvulnerable() &&
                    !isBarbedWithHp(h) &&
                    customPredicate(h)
            )
            .sort((h1, h2) => h1.getCurrentMagicalHealth() - h2.getCurrentMagicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getBestMagicalDisableInRange(
        range: number,
        from: IUnitEntity = OBJECT_MANAGER.myHero,
        customPredicate: (h: IHeroEntity) => boolean = () => true
    ): IHeroEntity | null {
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                (h) =>
                    h.health > 0 &&
                    !h.isIllusion() &&
                    h.isEnemy(from) &&
                    h.position.distance2d(from.position) < range &&
                    !h.isMagicImmune() &&
                    !h.isInvulnerable() &&
                    !h.isDisabled() &&
                    customPredicate(h)
            )
            .sort((h1, h2) => h1.getMaxHealth() - h2.getMaxHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getAllyInTrouble(
        range: number,
        minTroublePoints: number = 40,
        excludeSet: Set<IUnitEntity> = new Set(),
        from: IUnitEntity = OBJECT_MANAGER.myHero
    ): IHeroEntity | null {
        const ally = OBJECT_MANAGER.heroes
            .filter(
                (h) =>
                    h.health > 0 &&
                    !excludeSet.has(h) &&
                    !h.isIllusion() &&
                    !h.isEnemy(from) &&
                    h.position.distance2d(from.position) < range &&
                    !h.isMagicImmune() &&
                    !h.isInvulnerable() &&
                    getTroublePoints(h) > minTroublePoints
            )
            .sort((h1, h2) => getTroublePoints(h2) - getTroublePoints(h1))[0];
        if (ally) {
            return ally;
        }
        return null;
    }
}

// in range 0ish till 270
export function getTroublePoints(unit: IUnitEntity): number {
    if (!(unit instanceof IHeroEntity)) {
        return 0;
    }
    const isDisabledPoints = unit.isDisabled() ? 20 : 0;
    return unit.getEnemiesFightingMe(600).length * 10 + isDisabledPoints + getHealthTroubleScore(unit.getHealthPercent());
}

// https://www.desmos.com/calculator/dqrus8v1xk
function getHealthTroubleScore(healthPercent: number): number {
    return (1000 / (healthPercent + 20) - 5) * 5 - 16;
}

function isBarbedWithHp(unit: IUnitEntity) {
    return unit.isBarbed() && unit.getHealthPercent() > 18;
}

export const TARGET_SELECTOR = new TargetSelector();
