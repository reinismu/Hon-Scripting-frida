export interface Vec3 extends Vec2{
    z: number;
}

export interface Vec2 {
    x: number;
    y: number;
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

export namespace Vector2d {
    export function distance(self: Vec2, vec: Vec2): number {
        return Math.sqrt(Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2));
    }

    export function add(self: Vec2, vec: Vec2): Vec2 {
        return { x: vec.x + self.x, y: vec.y + self.y};
    }

    export function sub(self: Vec2, vec: Vec2): Vec2 {
        return { x: self.x - vec.x, y: self.y - vec.y};
    }

    export function div(self: Vec2, length: number): Vec2 {
        return { x: self.x / length, y: self.y / length };
    }

    export function mul(self: Vec2, length: number): Vec2 {
        return { x: self.x * length, y: self.y * length};
    }

    export function dot(self: Vec2, vec: Vec2): number {
        return  self.x * vec.x + self.y * vec.y;
    }

    export function lengthSqt(self: Vec2): number {
        return self.x * self.x + self.y * self.y;
    }

    export function length(self: Vec2): number {
        return Math.sqrt(lengthSqt(self));
    }

    export function normalized(self: Vec2): Vec2 {
        return div(self, length(self));
    }

    export function extendDir(self: Vec2, direction: Vec2, length: number): Vec2 {
        return add(self, mul(normalized(direction), length));
    }

    export function extendTo(self: Vec2, pos: Vec2, length: number): Vec2 {
        return add(self, mul(normalized(sub(pos, self)), length));
    }
}
