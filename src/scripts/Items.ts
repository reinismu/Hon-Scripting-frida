import { ACTION } from "../actions/Action";
import { IUnitEntity } from "../honIdaStructs";
import { DelayedCondition } from "../utils/DelayedCondition";
import { TARGET_SELECTOR } from "./TargetSelector";
import { Vector2d } from "../utils/Vector";

export function doGhostMarchersLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const boots = unit.getItem("Item_EnhancedMarchers");
    if (!boots) {
        return;
    }
    if (!boots.item.canActivate()) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, boots.index);
}

export function doShrunkensLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const shrunken = unit.getItem("Item_Immunity");
    if (!shrunken) {
        return;
    }
    if (!shrunken.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || Vector2d.distance(enemyHero.position, unit.position) > 550) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, shrunken.index);
}

export function doGrimoireOfPowerLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const grimoire = unit.getItem("Item_GrimoireOfPower");
    if (!grimoire) {
        return;
    }
    if (!grimoire.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || Vector2d.distance(enemyHero.position, unit.position) > 550 || unit.getHealthPercent() > 75) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, grimoire.index);
}

export function doNullFireLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const nullfire = unit.getItem("Item_ManaBurn1");
    if (!nullfire) {
        return;
    }

    if (!nullfire.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(nullfire.item.getDynamicRange());
    if (!enemyHero) {
        return;
    }
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, nullfire.index, enemyHero);
}

export function doSheepstickLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const sheepstick = unit.getItem("Item_Morph");
    if (!sheepstick) {
        return;
    }

    if (!sheepstick.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(sheepstick.item.getDynamicRange());
    if (!enemyHero) {
        return;
    }
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, sheepstick.index, enemyHero);
}
