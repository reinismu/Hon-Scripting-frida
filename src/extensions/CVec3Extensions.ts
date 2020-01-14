import { CVec3 } from "../honIdaStructs";
import { Vec3, Vec2 } from "../utils/Vector";

declare module "../honIdaStructs" {
    interface CVec3 {
        distance2d(vec: Vec2): number;
        distance2dSqr(vec: Vec3): number;
        randomized(length: number): Vec3;
    }
}

CVec3.prototype.distance2d = function(vec: Vec2): number {
    const self = this as CVec3;
    return Math.sqrt(Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2));
};

CVec3.prototype.distance2dSqr = function(vec: CVec3): number {
    const self = this as CVec3;
    return Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2);
};

CVec3.prototype.randomized = function(length: number): Vec3 {
    const self = this as CVec3;
    return {
        x: self.x + Math.random() * length,
        y: self.y + Math.random() * length,
        z: self.z
    };
};
