import { CLIENT } from "../game/Client";
import { IGAME } from "../game/Globals";
import { GRAPHICS } from "../graphics/Graphics";
import { IHeroEntity, IProjectile } from "../honIdaStructs";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { DelayedCondition } from "../utils/DelayedCondition";
import { Vec2, Vector2d } from "../utils/Vector";
import { Orbwalker } from "./Orbwalker";

type DangerousProjectileInfo = {
    speed: number;
    width: number;
    heroName: string;
    isMagic: boolean;
};
type DangerousProjectile = {
    info: DangerousProjectileInfo;
    projectile: IProjectile;
};

const extendedWidth = 10;

const dangerousProjectileInfo: { [k: string]: DangerousProjectileInfo | undefined } = {
    Projectile_Devourer_Ability1: {
        speed: 1600,
        width: 80,
        heroName: "Hero_Devourer",
        isMagic: false,
    },
    Projectile_Prisoner_Ability1: {
        speed: 1600,
        width: 100,
        heroName: "Hero_Prisoner",
        isMagic: false,
    },
    Projectile_Prisoner_Ability1_Return_Art: {
        speed: 1600,
        width: 100,
        heroName: "Hero_Prisoner",
        isMagic: false,
    },
    Projectile_Valkyrie_Ability2: {
        speed: 857.14,
        width: 80,
        heroName: "Hero_Valkyrie",
        isMagic: true,
    },
    Projectile_Gauntlet_Ability2: {
        speed: 1600,
        width: 80,
        heroName: "Hero_Gauntlet",
        isMagic: false,
    },
};

const isEffectingEntity = (entity: { position: Vec2; boundingRadius: number }, { info, projectile }: DangerousProjectile) => {
    const projStartPoint = projectile.position;
    const projEndPoint = Vector2d.extendDir(projectile.position, projectile.facingVector(), info.speed);

    const distToCenter = Vector2d.distToSegment(entity.position, projStartPoint, projEndPoint);
    const distToProjectile = Vector2d.distance(entity.position, projStartPoint);

    if (distToCenter > entity.boundingRadius + info.width + extendedWidth || distToProjectile > info.speed) {
        return false;
    }
    return true;
};

const secTillCatch = (entity: { position: Vec2; boundingRadius: number }, { info, projectile }: DangerousProjectile) => {
    const projStartPoint = projectile.position;

    const dist = Vector2d.distance(entity.position, projectile.position) - entity.boundingRadius;

    return dist / info.speed;
};

export const tryEvade = (
    evader: IHeroEntity,
    orbwalker: Orbwalker,
    justCasted: DelayedCondition,
    onTrouble: (dangProj: DangerousProjectile) => void = () => {}
): boolean => {
    const allyHeroes = new Set(OBJECT_MANAGER.heroes.filter((hero) => !hero.isEnemy(evader)).map((h) => h.typeName));
    const exitingDangerousProjectiles: DangerousProjectile[] = OBJECT_MANAGER.projectiles
        .map((projectile) => {
            const info = dangerousProjectileInfo[projectile.typeName];
            if (!info || allyHeroes.has(info.heroName) || (evader.isMagicImmune() && info.isMagic)) {
                return undefined;
            }
            return {
                info,
                projectile,
            };
        })
        .filter((projectile): projectile is DangerousProjectile => !!projectile);

    const projectileEffectingMe = exitingDangerousProjectiles.find((projectile) => isEffectingEntity(evader, projectile));

    if (!projectileEffectingMe || evader.isDisabled()) {
        return false;
    }

    // find best spot to move to

    // Bruteforce? Select points around me filter out the ones I can escape to, choose closest to my mouse pos

    const from = evader.position;
    const escapeTimeInSeconds = secTillCatch(evader, projectileEffectingMe);
    const maxMoveDistance = escapeTimeInSeconds * evader.getMoveSpeed(true);

    const evadeRange = maxMoveDistance + 300;
    const evadeRangeStep = evadeRange / 5;

    const goodRunPoints: Vec2[] = [];
    for (let dx = -evadeRange; dx < evadeRange; dx += evadeRangeStep) {
        for (let dy = -evadeRange; dy < evadeRange; dy += evadeRangeStep) {
            const testPoint = Vector2d.add(from, { x: dx, y: dy });

            if (!isEffectingEntity({ position: testPoint, boundingRadius: evader.boundingRadius }, projectileEffectingMe)) {
                goodRunPoints.push(testPoint);
            }
        }
    }

    const mousePosition = IGAME.mysteriousStruct.mousePosition;
    const bestPoint: Vec2 | undefined = goodRunPoints.sort(
        (p1, p2) => Vector2d.distanceSqr(p1, mousePosition) - Vector2d.distanceSqr(p2, mousePosition)
    )[0];
    if (bestPoint) {
        justCasted.delay(50);
        if (!orbwalker.canMove.isTrue()) {
            orbwalker.canMove.restart();
        }
        orbwalker.orbwalk(bestPoint, true);
        return true;
    } else {
        onTrouble(projectileEffectingMe);
        return false;
    }
};
