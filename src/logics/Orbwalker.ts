import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { Vec2, Vector2d, Vector } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION } from "../actions/Action";
import { TARGET_SELECTOR } from "../scripts/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { CLIENT } from "../game/Client";

const MIN_MOVE_DIST = 80;

export class Orbwalker {
    protected walker: IUnitEntity;

    canMove = new DelayedCondition();
    canAttack = new DelayedCondition();
    isNotAttacking = new DelayedCondition();

    private canFaceTheEnemy = new DelayedCondition();

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    public refreshWalker(walker: IUnitEntity) {
        this.walker = walker;
    }

    public orbwalk(position: Vec2, justWalk: boolean = false) {
        if (!this.walker.isMelee()) {
            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 30, this.walker.position);
            this.orbwalkTarget(target, position, justWalk);
            return;
        }

        const wantedTarget = TARGET_SELECTOR.getEasiestPhysicalKillInRange(
            this.walker.getAttackRange() + 40 + this.walker.getMoveSpeed(true) / 2,
            position
        );
        let target = null;
        if (wantedTarget) {
            position = Vector.extendDir(wantedTarget.position, { ...wantedTarget.facingVector(), z: 0 }, 70);
            target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 50, this.walker.position);
            if (target?.networkId != wantedTarget.networkId) {
                target = null;
            }
        }
        this.orbwalkTarget(target, position, justWalk);
    }

    public lastHit(position: Vec2) {
        const target = this.getKillableCreep();

        this.orbwalkTarget(target, position);
    }

    public laneClear(position: Vec2) {
        let target = this.getKillableCreep();
        if (!target) {
            target = this.getMaxHpCreep();
        }
        this.orbwalkTarget(target, position);
    }

    private getKillableCreep(): IUnitEntity | null {
        const closestKillableCreep = OBJECT_MANAGER.creeps
            .filter(c => !c.isDead() && c.getCurrentPhysicalHealth() <= this.walker.getFinalMinAttackDamage())
            .sort((h1, h2) => h1.position.distance2d(this.walker.position) - h2.position.distance2d(this.walker.position))[0];
        if (!closestKillableCreep) {
            return null;
        }
        const dist = Vector2d.distance(closestKillableCreep.position, this.walker.position);
        if (dist > this.walker.getAttackRange() + 25) {
            return null;
        }

        return closestKillableCreep;
    }

    private getMaxHpCreep(): IUnitEntity | null {
        const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];
        const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
        const creep = neutrals
            .concat(creeps)
            .filter(
                c =>
                    !c.isDead() &&
                    c.isEnemy(this.walker) &&
                    Vector2d.distance(c.position, this.walker.position) < this.walker.getAttackRange() + 25
            )
            .sort((h1, h2) => h1.health - h2.health)[0];

        if (!creep) {
            return null;
        }
        const dist = Vector2d.distance(creep.position, this.walker.position);
        if (dist > this.walker.getAttackRange() + 20) {
            return null;
        }

        return creep;
    }

    protected getAttackSlowTime(): number {
        if (this.walker.hasAnyOfTool(new Set(["State_Gauntlet_Ability1"]))) {
            console.log("slowed attack");
            return 300;
        }
        if (this.walker.isMelee()) {
            return 50;
        }
        return 0;
    }


    protected getMoveSlowTime(): number {
        return 0;
    }

    private orbwalkTarget(target: IUnitEntity | null, position: Vec2, justWalk: boolean = false) {
        if (!justWalk && this.canAttack.isTrue(500)) {
            if (target) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                this.isNotAttacking.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime() + 80);
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                    this.attack(target);
                    return;
                }
                if (this.canAttack.isTrue(turnTime)) {
                    if (this.canFaceTheEnemy.isTrue()) {
                        this.canFaceTheEnemy.delay(turnTime + 250);
                        this.move(Vector2d.extendTo(this.walker.position, target.position, 30));
                    }
                    return;
                }
            }
        }
        if (this.canMove.isTrue()) {
            if (Vector2d.distance(position, this.walker.position) < MIN_MOVE_DIST) {
                return;
            }
            this.canMove.delay(150 + this.getMoveSlowTime());
            this.move(position);
        }
    }

    private attack(target: IUnitEntity) {
        ACTION.attack(target, 0x8, this.walker);
    }

    private move(position: Vec2) {
        // ACTION.select(this.walker);
        // CLIENT.sendFakeMousePosToServer(position.x, position.y, this.walker.position.z);
        ACTION.move(position, 0x2, this.walker);
    }

    @Subscribe("EntitySpawnedEvent")
    onGameEntitySpawned(entity: IGameEntity) {
        if (!(entity instanceof IProjectile)) {
            return;
        }
    }
}
