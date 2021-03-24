import { IUnitEntity } from "../honIdaStructs";
import { goodPrediction } from "../scripts/Prediction";
import { Vec2, Vector2d } from "./Vector";

export const findBestLinearCast = (
    caster: IUnitEntity,
    range: number,
    radius: number,
    delayMS: number,
    projectileSpeed: number,
    targets: IUnitEntity[],
    minEnemyHit: number = 0
): Vec2 | undefined => {
    const targetPredictions = targets.map((t) => goodPrediction(caster, t, projectileSpeed, delayMS, range)).filter((p): p is Vec2 => !!p);

    const shootExtremes = targetPredictions
        .map((p) => Vector2d.calcTangentPoints(caster.position, p, radius * 0.9))
        .reduce((acc, val) => acc.concat(val), []);

    let bestTarget: Vec2 | undefined;
    let bestCount = minEnemyHit;

    for (const extreme of shootExtremes) {
        const hitCount = targetPredictions.filter((p) => Vector2d.distToSegmentSquared(p, caster.position, extreme) <= radius * radius)
            .length;
        if (bestCount <= hitCount) {
            bestCount = hitCount;
            bestTarget = extreme;
        }
    }

    return bestTarget;
};
