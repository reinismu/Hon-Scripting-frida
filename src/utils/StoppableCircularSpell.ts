import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { DelayedCondition } from "./DelayedCondition";
import { Vec2, Vector2d } from "./Vector";
import { ACTION } from "../actions/Action";
import { opPrediction, opPredictionCircular } from "../scripts/Prediction";

export class StoppableCircularSpell {
    private caster: IUnitEntity | null = null;

    private canNotStop = new DelayedCondition();
    private castPosition: Vec2 | null = null;
    private castTarget: IUnitEntity | null = null;
    private castTargetAnimationIndex = 0;
    private turnToTargetDelay: number = 0;
    private canStopCheck = new DelayedCondition();

    private justCasted: DelayedCondition;

    constructor(condition: DelayedCondition) {
        this.justCasted = condition;
    }

    /**
     *
     * @param spell
     * @param caster
     * @param target
     * @param noCollisionCheck returns false if it collides with something
     */
    cast(
        spell: IEntityAbility,
        spellIndex: number,
        caster: IUnitEntity,
        target: IUnitEntity,
        radius: number,
        impactDelay: number = 0,
        noCollisionCheck: (spell: IEntityAbility, caster: IUnitEntity, target: IUnitEntity, castPos: Vec2) => boolean = () => true
    ) {
        this.caster = caster;
        if (!spell.canActivate()) {
            return;
        }
        const spellActivationTime = spell.getAdjustedActionTime();
        if (!this.canNotStop.isTrue() && this.canStopCheck.isTrue() && this.castPosition && this.castTarget) {
            this.canStopCheck.delay(50);
            if (this.castTargetAnimationIndex != this.castTarget.animation) {
                this.stopCast();
                return;
            }

            const targetPos = this.predictPosition(
                spell,
                caster,
                this.castTarget,
                spellActivationTime + this.turnToTargetDelay - this.canNotStop.msPassed() + impactDelay,
                radius,
                noCollisionCheck
            );
            if (!targetPos) {
                this.stopCast();
                return;
            }
            const deviation = Vector2d.distance(targetPos, this.castPosition);
            if (deviation > radius) {
                this.stopCast();
                return;
            }
        }
        if (!this.justCasted.isTrue()) {
            return;
        }

        const targetPos = this.predictPosition(
            spell,
            caster,
            target,
            spellActivationTime + caster.getMsToTurnToPos(target.position) + impactDelay,
            radius,
            noCollisionCheck
        );
        if (!targetPos) {
            return;
        }

        ACTION.castSpellPosition(caster, spellIndex, targetPos.x, targetPos.y);
        this.castPosition = targetPos;
        this.castTarget = target;
        this.castTargetAnimationIndex = target.animation;
        this.turnToTargetDelay = caster.getMsToTurnToPos(target.position);

        this.justCasted.delay(spellActivationTime + this.turnToTargetDelay);
        this.canNotStop.delay(spellActivationTime + this.turnToTargetDelay);
    }

    isCasting(): boolean {
        return this.justCasted.isTrue();
    }

    protected predictPosition(
        spell: IEntityAbility,
        caster: IUnitEntity,
        target: IUnitEntity,
        delay: number = 0,
        radius: number,
        noCollisionCheck: (spell: IEntityAbility, caster: IUnitEntity, target: IUnitEntity, castPos: Vec2) => boolean
    ): Vec2 | null {
        const range = spell.getDynamicRange() + 20;

        const targetPos = opPredictionCircular(caster, target, delay, range, radius);
        if (!targetPos) {
            return null;
        }

        if (!noCollisionCheck(spell, caster, target, targetPos)) {
            return null;
        }

        return targetPos;
    }

    private stopCast() {
        if (!this.caster) {
            return;
        }
        // console.log("Stop cast");
        ACTION.stop(this.caster);
        this.justCasted.restart();
        this.turnToTargetDelay = 0;
        this.castPosition = null;
        this.castTarget = null;
        this.canNotStop.restart();
    }
}
