import { ACTION } from "../actions/Action";
import { IUnitEntity } from "../honIdaStructs";
import { DelayedCondition } from "../utils/DelayedCondition";
import { TARGET_SELECTOR } from "./TargetSelector";
import { Vector2d } from "../utils/Vector";

export function tryUseAllItems(unit: IUnitEntity, justCasted: DelayedCondition) {
    doShrunkensLogic(unit, justCasted);
    doExcruciatorLogic(unit, justCasted);
    doSheepstickLogic(unit, justCasted);
    doBarrierIdolLogic(unit, justCasted);
    doAstrolabeLogic(unit, justCasted);
    doArmorOfTheMadMage(unit, justCasted);
    doCodexLogic(unit, justCasted);
    doNullFireLogic(unit, justCasted);
    doLexTalionisLogic(unit, justCasted);
    doHellfireLogic(unit, justCasted);
    doGrimoireOfPowerLogic(unit, justCasted);
    doHypercrownLogic(unit, justCasted);
    doGhostMarchersLogic(unit, justCasted);
    doElderParasite(unit, justCasted);
}

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
    if (!enemyHero || unit.getEnemiesFightingMe(550).length == 0) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, shrunken.index);
}

export function doExcruciatorLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const shrunken = unit.getItem("Item_Excruciator");
    if (!shrunken) {
        return;
    }
    if (!shrunken.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || unit.getEnemiesFightingMe(550).length < 2) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, shrunken.index);
}

export function doBarrierIdolLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const shrunken = unit.getItem("Item_BarrierIdol");
    if (!shrunken) {
        return;
    }
    if (!shrunken.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || unit.getEnemiesFightingMe(550).length < 1) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, shrunken.index);
}

export function doAstrolabeLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const astrolabe = unit.getItem("Item_Astrolabe");
    if (!astrolabe) {
        return;
    }
    if (!astrolabe.item.canActivate()) {
        return;
    }
    
    const ally = TARGET_SELECTOR.getAllyInTrouble(900, 65);
    if (!ally) {
        return;
    }

    justCasted.delay(100);
    ACTION.castSpell2(unit, astrolabe.index);
}

export function doArmorOfTheMadMage(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const armor = unit.getItem("Item_ArmorOfTheMadMage");
    if (!armor) {
        return;
    }
    if (!armor.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || unit.getEnemiesFightingMe(550).length == 0) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, armor.index);
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

export function doHypercrownLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const hypercrown = unit.getItem("Item_Hypercrown");
    if (!hypercrown) {
        return;
    }
    if (!hypercrown.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || unit.getEnemiesFightingMe(750).length == 0) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpellEntity(unit, hypercrown.index, unit);
}

export function doElderParasite(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const elder = unit.getItem("Item_ElderParasite");
    if (!elder) {
        return;
    }
    if (!elder.item.canActivate()) {
        return;
    }
    const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
    if (!enemyHero || Vector2d.distance(enemyHero.position, unit.position) > 750) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, elder.index);
}

export function doLexTalionisLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const nullfire = unit.getItem("Item_LexTalionis");
    if (!nullfire) {
        return;
    }

    if (!nullfire.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(nullfire.item.getDynamicRange());
    if (!enemyHero) {
        return;
    }
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, nullfire.index, enemyHero);
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
    if (!enemyHero || enemyHero.isDisabled()) {
        return;
    }
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, nullfire.index, enemyHero);
}

export function doCodexLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const codex = unit.getItem("Item_Nuke");
    if (!codex) {
        return;
    }

    if (!codex.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(codex.item.getDynamicRange());
    if (!enemyHero) {
        return;
    }
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, codex.index, enemyHero);
}

export function doHellfireLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const nullfire = unit.getItem("Item_Silence");
    if (!nullfire) {
        return;
    }

    if (!nullfire.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getBestMagicalDisableInRange(nullfire.item.getDynamicRange());
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
    justCasted.delay(150);
    ACTION.castSpellEntity(unit, sheepstick.index, enemyHero);
}
