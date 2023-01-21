import { IUnitEntity } from "../honIdaStructs";
import { Vec3, Vector, Vec2, Vector2d } from "./Vector";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";

export function shitPrediction(enemy: IUnitEntity, extendBy: number = 50): Vec3 {
    return Vector.extendDir(enemy.position, { ...enemy.facingVector(), z: 0 }, extendBy);
}

export function unitPositionPrediction(target: IUnitEntity, delayMS: number) {
    const eneVelocity = VELOCITY_UPDATER.getVelocity(target);
    if (eneVelocity.x == 0 && eneVelocity.y == 0) {
        return target.position;
    }
    return Vector2d.add(target.position, Vector2d.mul(eneVelocity, delayMS / 1000));
}

export function goodPrediction(
    sourcePos: Vec2,
    target: IUnitEntity,
    projectileSpeed: number,
    castDelayMs: number,
    range: number
): Vec2 | null {
    const eneVelocity = VELOCITY_UPDATER.getVelocity(target);
    if (eneVelocity.x == 0 && eneVelocity.y == 0) {
        if (Vector2d.distance(target.position, sourcePos) <= range) {
            return target.position;
        }
        return null;
    }
    
    const turnMs = 0;// source.getMsToTurnToPos(target.position);
    const enemyPositionAfterDelay = Vector2d.add(target.position, Vector2d.mul(eneVelocity, (castDelayMs + turnMs) / 1000));
    const collisionPos = intercept(sourcePos, enemyPositionAfterDelay, eneVelocity, projectileSpeed);
    if (!collisionPos) {
        return null;
    }
    if (Vector2d.distance(collisionPos, sourcePos) <= range) {
        return collisionPos;
    }
    return null;
}

export function opPrediction(
    sourcePos: Vec2,
    target: IUnitEntity,
    projectileSpeed: number,
    castDelayMs: number,
    range: number,
    radius: number
): Vec2 | null {
    const eneVelocity = VELOCITY_UPDATER.getVelocity(target);
    if (eneVelocity.x == 0 && eneVelocity.y == 0) {
        if (Vector2d.distance(target.position, sourcePos) <= range) {
            return target.position;
        }
        return null;
    }

    const goodPos = goodPrediction(sourcePos, target, projectileSpeed, castDelayMs, range);
    if (!goodPos) {
        return null;
    }
    const latency = 0.1;
    const eneMoveSpeed = target.getMoveSpeed(true);
    const boundingRadius = 50; // target.boundingRadius broken
    const actionTime = Vector2d.distance(sourcePos, goodPos) / projectileSpeed + castDelayMs / 1000 + latency;
    const possibilityRadius = actionTime * eneMoveSpeed - boundingRadius- radius;

    const destTillStart = Vector2d.distToSegment(target.position, sourcePos, goodPos);
    const delta = destTillStart - possibilityRadius;

    // console.log(`delta  ${delta} `);
    // console.log(`target.boundingRadius  ${target.boundingRadius} `);
    // console.log(`target.movespeed  ${eneMoveSpeed} `);
    // console.log(`actionTime  ${actionTime} `);
    // console.log(`possibilityRadius  ${possibilityRadius}`);
    // console.log(`destTillStart  ${destTillStart}`);

    if (destTillStart <= possibilityRadius) {
        return goodPos;
    }
    return Vector2d.extendTo(goodPos, target.position, delta);
}

export function opPredictionCircular(
    source: IUnitEntity,
    target: IUnitEntity,
    castDelayMs: number,
    range: number,
    radius: number
): Vec2 | null {
    const eneVelocity = VELOCITY_UPDATER.getVelocity(target);
    if (eneVelocity.x == 0 && eneVelocity.y == 0) {
        if (Vector2d.distance(target.position, source.position) <= range) {
            return target.position;
        }
        return null;
    }

    const latency = 0.1;

    const turnMs = source.getMsToTurnToPos(target.position);
    let goodPos = Vector2d.add(target.position, Vector2d.mul(eneVelocity, (castDelayMs + turnMs) / 1000 + latency));

    const eneMoveSpeed = target.getMoveSpeed(true);
    const actionTime = castDelayMs / 1000 + latency;
    const possibilityRadius = actionTime * eneMoveSpeed - target.boundingRadius - radius;

    const destTillStart = Vector2d.distToSegment(target.position, source.position, goodPos);
    const delta = destTillStart - possibilityRadius;

    // console.log(`delta  ${delta} `);
    // console.log(`target.boundingRadius  ${target.boundingRadius} `);
    // console.log(`actionTime  ${actionTime} `);
    // console.log(`possibilityRadius  ${possibilityRadius}`);
    // console.log(`destTillStart  ${destTillStart}`);

    if (destTillStart > possibilityRadius) {
        goodPos = Vector2d.extendTo(goodPos, target.position, delta);
    }
    if (Vector2d.distance(goodPos, source.position) <= range) {
        return goodPos;
    }
    return null;
}

/**
 * Return the firing solution for a projectile starting at 'src' with
 * velocity 'v', to hit a target, 'dst'.
 *
 * @param Object src position of shooter
 * @param Object dst position & velocity of target
 * @param Number v   speed of projectile
 * @return Object Coordinate at which to fire (and where intercept occurs)
 *
 * E.g.
 * >>> intercept({x:2, y:4}, {x:5, y:7, vx: 2, vy:1}, 5)
 * = {x: 8, y: 8.5}
 */
function intercept(src: Vec2, targetPos: Vec2, targetVel: Vec2, projSpeed: number): Vec2 | null {
    var tx = targetPos.x - src.x,
        ty = targetPos.y - src.y,
        tvx = targetVel.x,
        tvy = targetVel.y;

    // Get quadratic equation components
    var a = tvx * tvx + tvy * tvy - projSpeed * projSpeed;
    var b = 2 * (tvx * tx + tvy * ty);
    var c = tx * tx + ty * ty;

    // Solve quadratic
    var ts = quad(a, b, c); // See quad(), below

    // Find smallest positive solution
    var sol = null;
    if (ts) {
        var t0 = ts[0],
            t1 = ts[1];
        var t = Math.min(t0, t1);
        if (t < 0) t = Math.max(t0, t1);
        if (t > 0) {
            sol = {
                x: targetPos.x + targetVel.x * t,
                y: targetPos.y + targetVel.y * t
            };
        }
    }

    return sol;
}

/**
 * Return solutions for quadratic
 */
function quad(a: number, b: number, c: number): number[] | null {
    var sol = null;
    if (Math.abs(a) < 1e-6) {
        if (Math.abs(b) < 1e-6) {
            sol = Math.abs(c) < 1e-6 ? [0, 0] : null;
        } else {
            sol = [-c / b, -c / b];
        }
    } else {
        var disc = b * b - 4 * a * c;
        if (disc >= 0) {
            disc = Math.sqrt(disc);
            a = 2 * a;
            sol = [(-b - disc) / a, (-b + disc) / a];
        }
    }
    return sol;
}
