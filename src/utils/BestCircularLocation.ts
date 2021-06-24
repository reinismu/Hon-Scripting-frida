import { IUnitEntity } from "../honIdaStructs";
import { unitPositionPrediction } from "./Prediction";
import { Vec2, Vector2d } from "./Vector";

export const findBestCircularCast = (
    caster: IUnitEntity,
    range: number,
    radius: number,
    delayMS: number,
    targets: IUnitEntity[],
    step: number = 40,
    enemyCount: number = 0
): Vec2 | undefined => {
    const from = caster.position;

    let bestTarget: Vec2 | undefined;
    let bestCount = enemyCount;
    let bestDistSum = Number.MAX_VALUE;

    const targetPredictions = targets.map((t) => unitPositionPrediction(t, delayMS));

    for (let dx = -range; dx < range; dx += step) {
        for (let dy = -range; dy < range; dy += step) {
            const testPoint = Vector2d.add(from, { x: dx, y: dy });
            // if not in range ignore
            if (Vector2d.distanceSqr(testPoint, from) > range * range) {
                continue;
            }
            let distSum = 0;
            const targetCount = targetPredictions.filter((t) => {
                const dist = Vector2d.distanceSqr(testPoint, t);
                if (dist < radius * radius) {
                    distSum += dist;
                    return true;
                }
                return false;
            }).length;
            if (targetCount > bestCount || (targetCount > 0 && targetCount == bestCount && distSum < bestDistSum)) {
                bestCount = targetCount;
                bestTarget = testPoint;
                bestDistSum = distSum;
            }
        }
    }
    return bestTarget;
};

export const findBestCircularProjectileCast = (
    caster: IUnitEntity,
    range: number,
    radius: number,
    delayMS: number,
    projectileSpeed: number,
    targets: IUnitEntity[],
    step: number = 80,
    enemyCount: number = 0
): Vec2 | undefined => {
    const from = caster.position;

    let bestTarget: Vec2 | undefined;
    let bestCount = enemyCount;
    let bestDistSum = Number.MAX_VALUE;

    for (let dx = -range; dx < range; dx += step) {
        for (let dy = -range; dy < range; dy += step) {
            const testPoint = Vector2d.add(from, { x: dx, y: dy });
            // if not in range ignore
            if (Vector2d.distanceSqr(testPoint, from) > range * range) {
                continue;
            }
            const fromDist = Vector2d.distance(testPoint, from);
            const travelTime = (fromDist * 1000) / projectileSpeed;
            const targetPredictions = targets.map((t) => unitPositionPrediction(t, delayMS + travelTime));

            let distSum = 0;
            const targetCount = targetPredictions.filter((t) => {
                const dist = Vector2d.distanceSqr(testPoint, t);
                if (dist < radius * radius) {
                    distSum += dist;
                    return true;
                }
                return false;
            }).length;
            if (targetCount > bestCount || (targetCount > 0 && targetCount == bestCount && distSum < bestDistSum)) {
                bestCount = targetCount;
                bestTarget = testPoint;
                bestDistSum = distSum;
            }
        }
    }
    return bestTarget;
};
