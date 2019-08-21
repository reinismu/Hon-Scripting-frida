import { CVec3 } from "../honIdaStructs";
import { Vec3 } from "../utils/Vec3";

declare module "../honIdaStructs" {
    interface CVec3 {
        distance2d(vec: Vec3): number;
    }
}

CVec3.prototype.distance2d = function(vec: CVec3): number {
    const self = this as CVec3;
    return Math.sqrt(Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2));
};
