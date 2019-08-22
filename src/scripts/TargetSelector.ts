import { IHeroEntity } from "../honIdaStructs";
import "../extensions/GameEntityExtensions";
import "../extensions/CVec3Extensions";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class TargetSelector {
    getClosestEnemyHero(): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes
            .filter(h => h.health > 0 && h.isEnemy(me))
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
                h => h.health > 0 && !h.isIllusion() && h.isEnemy(me) && h.position.distance2d(me.position) < range && !h.isPhysicalImmune()
            )
            .sort((h1, h2) => h1.getCurrentPhysicalHealth() - h2.getCurrentPhysicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }

    getEasiestMagicalKillInRange(range: number): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes
            .filter(
                h => h.health > 0 && !h.isIllusion() && h.isEnemy(me) && h.position.distance2d(me.position) < range && !h.isMagicImmune()
            )
            .sort((h1, h2) => h1.getCurrentMagicalHealth() - h2.getCurrentMagicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }
}

export const TARGET_SELECTOR = new TargetSelector();
