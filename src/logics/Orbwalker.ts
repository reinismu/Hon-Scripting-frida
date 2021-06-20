import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile, CConsoleElement } from "../honIdaStructs";
import { Vec2, Vector2d, Vector } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION } from "../actions/Action";
import { TARGET_SELECTOR } from "../scripts/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { CLIENT } from "../game/Client";
import { INPUT } from "../input/Input";

const MIN_MOVE_DIST = 30;

export class Orbwalker {
    protected walker: IUnitEntity;

    canMove = new DelayedCondition();
    canAttack = new DelayedCondition();
    isNotAttacking = new DelayedCondition();

    private canFaceTheEnemy = new DelayedCondition();

    private previousAnimation = 0;
    private previousTarget: IUnitEntity | null = null;

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
            const angle = wantedTarget.turnAngle(this.walker.position);

            if (angle > 45) {
                const wantedFuturePos = Vector2d.extendDir(
                    wantedTarget.position,
                    wantedTarget.facingVector(),
                    70
                );
                const position1 = Vector2d.extendDir(wantedFuturePos, wantedTarget.facingVector(angle * 0.5), 80);
                const position2 = Vector2d.extendDir(wantedFuturePos, wantedTarget.facingVector(-angle * 0.5), 80);

                position =
                    Vector2d.distance(position1, this.walker.position) < Vector2d.distance(position2, this.walker.position)
                        ? position1
                        : position2;
            } else {
                position = Vector2d.extendDir(wantedTarget.position, wantedTarget.facingVector(), 50);
            }
            if (!INPUT.isShiftDown()) {
                target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 50, this.walker.position);
                if (target?.networkId != wantedTarget.networkId) {
                    target = null;
                }
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
            .filter((c) => !c.isDead() && c.getCurrentPhysicalHealth() <= this.walker.getFinalMinAttackDamage())
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
                (c) =>
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

    // protected getMoveDist(): number {
    //     return this.walker.ran() ?;
    // }
    
    private orbwalkTarget(target: IUnitEntity | null, position: Vec2, justWalk: boolean = false) {
        // this.orbwalkTargetNew(target, position, justWalk);
        // // return;
        if (!justWalk && this.canAttack.isTrue(500)) {
            if (target) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                this.isNotAttacking.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime() + 100);
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                    this.attack(target);
                    return;
                }
                if (this.canAttack.isTrue(turnTime)) {
                    if (this.canFaceTheEnemy.isTrue()) {
                        this.canFaceTheEnemy.delay(turnTime + 250);
                        this.attack(target);
                        return;
                    }
                }
            }
        }
        if (this.canMove.isTrue()) {
            if (Vector2d.distance(position, this.walker.position) < MIN_MOVE_DIST) {
                return;
            }
            this.canMove.delay(140 + this.getMoveSlowTime());
            this.move(position);
        }
    }

    private orbwalkTargetNew(target: IUnitEntity | null, position: Vec2, justWalk: boolean = false) {
        if (this.previousAnimation != this.walker.animation) {
            // Started attacking
            if ([1,2].includes(this.walker.animation)) {
                this.canAttack.delay(this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime() + 100);
                this.canMove.delay(this.walker.getAdjustedAttackActionTime() + 220);
                this.isNotAttacking.delay(this.walker.getAdjustedAttackActionTime() + 250);
            } else if(!this.isNotAttacking.isTrue()) {
                // this.canAttack.delay(200);
                // this.canMove.delay(200);
                // if (target) {
                //     this.attack(target);
                // }
            }
        }
        this.previousAnimation = this.walker.animation;


        // if (!this.previousTarget?.isAlive && !this.isNotAttacking.isTrue()) {
        //     this.canAttack.delay(200);
        //     this.canMove.delay(200);
        //     if (target) {
        //         this.attack(target);
        //     }
        // }

        this.previousTarget = target;


        if (!justWalk && this.canAttack.isTrue(500)) {
            if (target) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                this.isNotAttacking.delay(turnTime + 250);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + 200);
                    this.canMove.delay(turnTime + 200);
                    this.attack(target);
                    return;
                }
                if (this.canAttack.isTrue(turnTime)) {
                    if (this.canFaceTheEnemy.isTrue()) {
                        this.canFaceTheEnemy.delay(turnTime + 250);
                        this.attack(target);
                    }
                    return;
                }
            }
        }
        if (this.canMove.isTrue()) {
            if (Vector2d.distance(position, this.walker.position) < MIN_MOVE_DIST) {
                return;
            }
            this.canMove.delay(140 + this.getMoveSlowTime());
            this.move(position);
        }
    }

    resetAttackCooldown() {
        this.canAttack.restart();
    }

    private attack(target: IUnitEntity) {
        ACTION.attack(target, 0x8, this.walker);
    }

    private move(position: Vec2) {
        // ACTION.select(this.walker);
        // CLIENT.sendFakeMousePosToServer(position.x, position.y, this.walker.position.z);
        ACTION.move(position, 0x2, this.walker);
    }

    // @Subscribe("EntitySpawnedEvent")
    // onGameEntitySpawned(entity: IGameEntity) {
    //     if (!(entity instanceof IProjectile)) {
    //         return;
    //     }
    //     // console.log(`myAnim: ${this.walker.animation}`);
    //     // console.log(`type: ${entity.typeName}`);
    //     if (entity.typeName === "Projectile_ShadowBlade_Ability3" && !this.isNotAttacking.isTrue()) {
    //         this.canMove.delay(0);
    //         this.isNotAttacking.delay(0);
    //         this.canAttack.delay(this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime() - this.walker.getAdjustedAttackActionTime());
    //     }
    // }

    // @Subscribe("RequestStartAnimEvent")
    // onAnimationStart(args: NativePointer[]) {
    //     // Dont update state if we are shooting
    //     console.log(`Skeleton: ${this.walker.skeleton.ptr} anim: ${this.walker.animation}`);
    //     // console.log(`RequestStartAnimEvent: ${args[0]} ${args[1]} ${args[2]} ${args[3]}  ${args[4]}  ${args[5]}`);
    // }
}
