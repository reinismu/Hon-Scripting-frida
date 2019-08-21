import { IUnitEntity } from "../honIdaStructs";
import { Vec3, Vector } from "../utils/Vector";

export function shitPrediction(enemy: IUnitEntity, extendBy: number = 50): Vec3 {
    return Vector.extendDir(enemy.position, { ...enemy.facingVector(), z: 0 }, extendBy);
}
