import { EventBus, Subscribe } from "eventbus-ts";
import { IGameEntity, IUnitEntity, IProjectile, CConsoleElement } from "../honIdaStructs";
import { Vec2, Vector2d, Vector } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { ACTION } from "../actions/Action";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { CLIENT } from "../game/Client";
import { INPUT } from "../input/Input";
import { fauxBowTargetMap } from "./Items";
import console from "console";

const MIN_MOVE_DIST = 30;

export class Orbwalker {
    protected walker: IUnitEntity;

    canMove = new DelayedCondition();
    canAttack = new DelayedCondition();
    isNotAttacking = new DelayedCondition();
    isNotPreparingAttack = new DelayedCondition();

    private canFaceTheEnemy = new DelayedCondition();

    constructor(walker: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.walker = walker;
    }

    public refreshWalker(walker: IUnitEntity) {
        this.walker = walker;
    }

    public orbwalk(position: Vec2, justWalk: boolean = false) {
        if (this.walker.isDisabled()) {
            return;
        }
        if (!this.walker.isMelee()) {
            const fauxBowTargetNetworkId = fauxBowTargetMap[this.walker.networkId];

            const target = TARGET_SELECTOR.getEasiestPhysicalKillInRange(
                this.walker.getAttackRange() + 30,
                this.walker.position,
                () => true,
                (h, currentRange) => {
                    if (!fauxBowTargetNetworkId) {
                        return currentRange;
                    }
                    if (h.networkId === fauxBowTargetNetworkId) {
                        return currentRange;
                    }
                    return currentRange - 20000;
                }
            );
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
                const wantedFuturePos = Vector2d.extendDir(wantedTarget.position, wantedTarget.facingVector(), 70);
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
        // Stun check to reset attack
        if (!this.isNotPreparingAttack.isTrue() && (this.walker.isDisabled() || this.walker.isDisarmed())) {
            this.canAttack.delay(100);
            this.canMove.delay(100);
            this.isNotPreparingAttack.restart();
            console.log("Reste afsdsfasgdsdg")
        }

        if (!justWalk && this.canAttack.isTrue(500)) {
            if (target && !this.walker.isDisarmed()) {
                const turnTime = this.walker.getMsToTurnToPos(target.position);
                this.isNotAttacking.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                if (this.canAttack.isTrue()) {
                    this.canAttack.delay(turnTime + this.walker.getAdjustedAttackCooldown() + this.getAttackSlowTime() + 100);
                    this.canMove.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
                    this.isNotPreparingAttack.delay(turnTime + this.walker.getAdjustedAttackActionTime() + 250);
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
            if (Vector2d.distance(position, this.walker.position) <  (this.walker.isMelee() ? MIN_MOVE_DIST : 60)) {
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
        ACTION.move(position, 0x2, this.walker);
    }
}
