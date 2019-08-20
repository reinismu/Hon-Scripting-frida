import { CVec3 } from "../honIdaStructs";

declare module "../honIdaStructs" {
    interface CVec3 {
        distance2d(vec: CVec3): number;
    }
}

CVec3.prototype.distance2d = function(vec: CVec3): number {
    const self = this as CVec3;
    return Math.sqrt(Math.pow((self.x - vec.x), 2) + Math.pow((self.y - vec.y), 2));
};
