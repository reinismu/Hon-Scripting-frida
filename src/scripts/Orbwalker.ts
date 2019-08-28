import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION, Action } from "../actions/Action";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

const MIN_MOVE_DIST = 80;

export class Orbwalker {
    private walker: IUnitEntity;

    canMove = new DelayedCondition();
    canAttack = new DelayedCondition();
    private canFaceTheEnemy = new DelayedCondition();

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    public refreshWalker(walker: IUnitEntity) {
        this.walker = walker;
    }

    public orbwalk(position: Vec2, justWalk: boolean = false) {
        this.walker = OBJECT_MANAGER.myHero;

        if (!justWalk && this.canAttack.isTrue(500)) {
            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange());
            if (target) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown());
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 200);
                    ACTION.attack(target);
                    return;
                }
                if (this.canAttack.isTrue(turnTime)) {
                    if (this.canFaceTheEnemy.isTrue()) {
                        this.canFaceTheEnemy.delay(turnTime + 250);
                        ACTION.move(Vector2d.extendTo(this.walker.position, target.position, 30));
                    }
                    return;
                }
            }
        }
        if (this.canMove.isTrue()) {
            if (Vector2d.distance(position, this.walker.position) < MIN_MOVE_DIST) {
                return;
            }
            this.canMove.delay(150);
            ACTION.move(position);
        }
    }

    @Subscribe("EntitySpawnedEvent")
    onGameEntitySpawned(entity: IGameEntity) {
        if (!(entity instanceof IProjectile)) {
            return;
        }
    }
}
