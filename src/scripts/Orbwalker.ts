import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { tryGetTypeInfo } from "../objects/RTTI";
import { Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION, Action } from "../actions/Action";
import { TARGET_SELECTOR } from "./TargetSelector";

const MIN_MOVE_DIST = 80;

export class Orbwalker {
    private walker: IUnitEntity;

    private canMove = new DelayedCondition();
    private canAttack = new DelayedCondition();

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    public orbwalk(position: Vec2) {
        if (this.canAttack.active(500)) {
            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange());
            if (target) {
                const turnTime = this.msToTurnToTarget(target);
                if (this.canAttack.active(turnTime)) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown() + 50);
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 50);
                    console.log(`turnTime ${turnTime}`);
                    ACTION.attack(target);
                    return;
                }
            }
        }
        if (this.canMove.active()) {
            if (Vector2d.distance(position, this.walker.position) < 80) {
                return;
            }
            this.canMove.delay(150);
            ACTION.move(position.x, position.y);
        }
    }

    private msToTurnToTarget(target: IUnitEntity): number {
        const angle = this.turnAngle(this.walker, target.position);
        return angle * 2.7; // Magic number TODO fix
    }

    private turnAngle(entity: IUnitEntity, pos: Vec2) {
        const faceVec = Vector2d.normalized(entity.facingVector());
        const targetVec = Vector2d.normalized(Vector2d.sub(pos, entity.position));
        return this.radianToDegree(Math.acos(Vector2d.dot(faceVec, targetVec)));
    }

    private radianToDegree(rad: number): number {
        return (rad * 180) / Math.PI;
    }

    @Subscribe("EntitySpawnedEvent")
    onGameEntitySpawned(entity: IGameEntity) {
        if (!(entity instanceof IProjectile)) {
            return;
        }
        console.log(`My hero pos ${this.walker.position.x} ${this.walker.position.y}`);
        console.log(`Projectile spawned ${entity.ptr}   ${entity.position.x}`);
    }
}
