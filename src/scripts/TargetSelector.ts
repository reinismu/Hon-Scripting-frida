import { IHeroEntity, IUnitEntity } from "../honIdaStructs";
import "../extensions/GameEntityExtensions";
import "../extensions/CVec3Extensions";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class TargetSelector {
    getClosestEnemyHero(): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes
            .filter(h => !h.isDead() && h.isEnemy(me))
            .sort((h1, h2) => h1.position.distance2d(me.position) - h2.position.distance2d(me.position))[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getEasiestPhysicalKillInRange(range: number): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                h => h.health > 0 && !h.isIllusion() && h.isEnemy(me) && h.position.distance2d(me.position) < range && !h.isPhysicalImmune() && !h.isInvulnerable() && !this.isBarbedWithHp(h)
            )
            .sort((h1, h2) => h1.getCurrentPhysicalHealth() - h2.getCurrentPhysicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getEasiestMagicalKillInRange(range: number, from: IUnitEntity = OBJECT_MANAGER.myHero): IHeroEntity | null {
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                h => h.health > 0 && !h.isIllusion() && h.isEnemy(from) && h.position.distance2d(from.position) < range && !h.isMagicImmune() && !h.isInvulnerable() && !this.isBarbedWithHp(h)
            )
            .sort((h1, h2) => h1.getCurrentMagicalHealth() - h2.getCurrentMagicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getBestMagicalDisableInRange(range: number, from: IUnitEntity = OBJECT_MANAGER.myHero): IHeroEntity | null {
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                h => h.health > 0 && !h.isIllusion() && h.isEnemy(from) && h.position.distance2d(from.position) < range && !h.isMagicImmune() && !h.isInvulnerable() && !h.isDisabled()
            )
            .sort((h1, h2) => h1.getMaxHealth() - h2.getMaxHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    private isBarbedWithHp(unit: IUnitEntity) {
        return unit.isBarbed() && unit.getHealthPercent() > 18;
    }
}

export const TARGET_SELECTOR = new TargetSelector();
