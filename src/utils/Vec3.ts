export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export namespace Vector {
    export function distance2d(self: Vec3, vec: Vec3): number {
        return Math.sqrt(Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2));
    }

    export function add(self: Vec3, vec: Vec3): Vec3 {
        return { x: vec.x + self.x, y: vec.y + self.y, z: vec.z + self.z };
    }

    export function sub(self: Vec3, vec: Vec3): Vec3 {
        return { x: self.x - vec.x, y: self.y - vec.y, z: self.z - vec.z };
    }

    export function div(self: Vec3, length: number): Vec3 {
        return { x: self.x / length, y: self.y / length, z: self.z / length };
    }

    export function mul(self: Vec3, length: number): Vec3 {
        return { x: self.x * length, y: self.y * length, z: self.z * length };
    }

    export function lengthSqt(self: Vec3): number {
        return self.x * self.x + self.y * self.y + self.z * self.z;
    }

    export function length(self: Vec3): number {
        return Math.sqrt(lengthSqt(self));
    }

    export function normalized(self: Vec3): Vec3 {
        return div(self, length(self));
    }

    export function extendDir(self: Vec3, direction: Vec3, length: number): Vec3 {
        return add(self, mul(normalized(direction), length));
    }

    export function extendTo(self: Vec3, pos: Vec3, length: number): Vec3 {
        return add(self, mul(normalized(sub(pos, self)), length));
    }
}
