import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile } from "../honIdaStructs";
import { Vec2, Vector2d, Vector } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION, Action } from "../actions/Action";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";

const MIN_MOVE_DIST = 80;

export class Orbwalker {
    private walker: IUnitEntity;

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
        this.walker = OBJECT_MANAGER.myHero;
        if (!this.walker.isMelee()) {
            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 30);
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
            target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 50);
            if (target?.networkId != wantedTarget.networkId) {
                target = null;
            }
        }
        this.orbwalkTarget(target, position, justWalk);
    }

    public lastHit(position: Vec2) {
        this.walker = OBJECT_MANAGER.myHero;
        const target = this.getKillableCreep();

        this.orbwalkTarget(target, position);
    }

    public laneClear(position: Vec2) {
        this.walker = OBJECT_MANAGER.myHero;
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

    private getAttackSlowTime(): number {
        if (this.walker.hasAnyOfTool(new Set(["State_Gauntlet_Ability1"]))) {
            console.log("slowed attack");
            return 300;
        }
        if (this.walker.isMelee()) {
            return 50;
        }
        return 0;
    }

    private orbwalkTarget(target: IUnitEntity | null, position: Vec2, justWalk: boolean = false) {
        if (!justWalk && this.canAttack.isTrue(500)) {
            if (target) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                this.isNotAttacking.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime());
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
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
