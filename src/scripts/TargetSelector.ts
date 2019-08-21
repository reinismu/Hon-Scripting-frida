import { IHeroEntity } from "../honIdaStructs";
import "../extensions/GameEntityExtensions";
import "../extensions/CVec3Extensions";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class TargetSelector {
    getClosestEnemyHero(): IHeroEntity | null {
        const me = OBJECT_MANAGER.myHero;
        // console.log("Get closest Enemy: " + OBJECT_MANAGER.heroes.length);
        // OBJECT_MANAGER.heroes
        //     .filter(h => h.health > 0 && h.isEnemy(me))
        //     .sort((h1, h2) => h1.position.distance2d(me.position) - h2.position.distance2d(me.position))
        //     .forEach(e => {
        //         console.log(`hero ${e.typeName}`);
        //         console.log(`dist ${e.position.distance2d(me.position)}`);
        //         console.log(`post ${e.position.x}`);
        //     });
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
        // console.log("Get closest Enemy: " + OBJECT_MANAGER.heroes.length);
        // OBJECT_MANAGER.heroes
        //     .filter(h => h.health > 0 && h.isEnemy(me))
        //     .sort((h1, h2) => h1.position.distance2d(me.position) - h2.position.distance2d(me.position))
        //     .forEach(e => {
        //         console.log(`hero ${e.typeName}`);
        //         console.log(`dist ${e.position.distance2d(me.position)}`);
        //         console.log(`post ${e.position.x}`);
        //     });
        const enemy = OBJECT_MANAGER.heroes
            .filter(h => h.health > 0 && h.isEnemy(me) && h.position.distance2d(me.position) < range)
            .sort((h1, h2) => h1.getCurrentPhysicalHealth() - h2.getCurrentPhysicalHealth())[0];
        if (enemy) {
            return enemy;
        }
        return null;
    }
}

export const TARGET_SELECTOR = new TargetSelector();
