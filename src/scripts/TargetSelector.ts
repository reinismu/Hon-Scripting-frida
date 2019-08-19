import { IHeroEntity } from "../honIdaStructs";
import "../extensions/GameEntityExtensions";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class TargetSelector {
    getClosestEnemyHero(): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        const enemy = OBJECT_MANAGER.heroes.find(h => h.isEnemy(me));
        if (enemy) {
            return enemy;
        }
        return null;
    }
}

export const TARGET_SELECTOR = new TargetSelector();