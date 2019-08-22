import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION, Action } from "../actions/Action";
import { TARGET_SELECTOR } from "./TargetSelector";

const MIN_MOVE_DIST = 80;

export class Orbwalker {
    private walker: IUnitEntity;

    private canMove = new DelayedCondition();
    private canAttack = new DelayedCondition();
    private canFaceTheEnemy = new DelayedCondition();

    private lastProjSpawned = 0;

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    public orbwalk(position: Vec2, justWalk: boolean = false) {
        if (!justWalk && this.canAttack.active(500)) {
            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange());
            if (target) {
                const turnTime = this.msToTurnToTarget(target);
                if (this.canAttack.active()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown());
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 200);
                    ACTION.attack(target);
                    return;
                }
                if (this.canAttack.active(turnTime)) {
                    if (this.canFaceTheEnemy.active()) {
                        this.canFaceTheEnemy.delay(turnTime + 250);
                        ACTION.move(Vector2d.extendTo(this.walker.position, target.position, 30));
                    }
                    return;
                }
            }
        }
        if (this.canMove.active()) {
            if (Vector2d.distance(position, this.walker.position) < 80) {
                return;
            }
            this.canMove.delay(150);
            ACTION.move(position);
        }
    }

    private msToTurnToTarget(target: IUnitEntity): number {
        const angle = this.turnAngle(this.walker, target.position);
        return angle * 0.8; // Magic number TODO fix
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
        console.log(`Projectile spawn delta ${Date.now() - this.lastProjSpawned}`);
        this.lastProjSpawned = Date.now();
    }
}
