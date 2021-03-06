export interface Vec3 extends Vec2 {
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
    export function distanceSqr(self: Vec2, vec: Vec2): number {
        return Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2);
    }

    export function distance(self: Vec2, vec: Vec2): number {
        return Math.sqrt(Math.pow(self.x - vec.x, 2) + Math.pow(self.y - vec.y, 2));
    }

    export function add(self: Vec2, vec: Vec2): Vec2 {
        return { x: vec.x + self.x, y: vec.y + self.y };
    }

    export function sub(self: Vec2, vec: Vec2): Vec2 {
        return { x: self.x - vec.x, y: self.y - vec.y };
    }

    export function div(self: Vec2, length: number): Vec2 {
        return { x: self.x / length, y: self.y / length };
    }

    export function mul(self: Vec2, length: number): Vec2 {
        return { x: self.x * length, y: self.y * length };
    }

    export function dot(self: Vec2, vec: Vec2): number {
        return self.x * vec.x + self.y * vec.y;
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

    function sqr(x: number) {
        return x * x;
    }

    function dist2(v: Vec2, w: Vec2) {
        return sqr(v.x - w.x) + sqr(v.y - w.y);
    }

    export function distToSegmentSquared(p: Vec2, v: Vec2, w: Vec2) {
        var l2 = dist2(v, w);

        if (l2 == 0) return dist2(p, v);

        var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;

        if (t < 0) return dist2(p, v);
        if (t > 1) return dist2(p, w);

        return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
    }

    export function distToSegment(p: Vec2, v1: Vec2, v2: Vec2) {
        return Math.sqrt(distToSegmentSquared(p, v1, v2));
    }

    export function calcTangentPoints(self: Vec2, circleCenter: Vec2, radius: number): Vec2[] {
        // find tangents
        const dx = self.x - circleCenter.x;
        const dy = self.y - circleCenter.y;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd <= radius) {
            return [];
        }
        const a = Math.asin(radius / dd);
        const b = Math.atan2(dy, dx);

        const t = b - a;
        const deltaTangent1 = { x: radius * Math.sin(t), y: radius * -Math.cos(t) };
        const t2 = b + a;
        const deltaTangent2 = { x: radius * Math.sin(t2), y: radius * -Math.cos(t2) };

        const tangent1 = add(circleCenter, deltaTangent1);
        const tangent2 = add(circleCenter, deltaTangent2);
        return [tangent1, tangent2];
    }
}
