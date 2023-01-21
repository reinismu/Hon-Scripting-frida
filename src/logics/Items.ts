import { ACTION } from "../actions/Action";
import { IUnitEntity } from "../honIdaStructs";
import { DelayedCondition } from "../utils/DelayedCondition";
import { TARGET_SELECTOR } from "./TargetSelector";
import { Vector2d } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { INPUT } from "../input/Input";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";

export function tryUseAllItems(unit: IUnitEntity, justCasted: DelayedCondition) {
    doShrunkensLogic(unit, justCasted);
    doAstrolabeLogic(unit, justCasted);
    doInsantariusLogic(unit, justCasted);
    doExcruciatorLogic(unit, justCasted);
    doSheepstickLogic(unit, justCasted);
    // doFauxBowLogic(unit, justCasted);
    doBarrierIdolLogic(unit, justCasted);
    doArmorOfTheMadMage(unit, justCasted);
    doCodexLogic(unit, justCasted);
    doDreamCatcherLogic(unit, justCasted);
    doSoulTrapLogic(unit, justCasted);
    doNullFireLogic(unit, justCasted);
    doLexTalionisLogic(unit, justCasted);
    doHellfireLogic(unit, justCasted);
    doGrimoireOfPowerLogic(unit, justCasted);
    doHypercrownLogic(unit, justCasted);
    doGhostMarchersLogic(unit, justCasted);
    doElderParasite(unit, justCasted);
}

export const fauxBowTargetMap: { [k: number]: number | undefined} = {};

export function doFauxBowLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue() || unit.isStealth()) {
        return;
    }

    if (!unit.hasTool("State_FauxBow")) {
        fauxBowTargetMap[unit.networkId] = undefined;
    }

    const fausBow = unit.getItem("Item_FauxBow");
    if (!fausBow) {
        return;
    }

    if (!fausBow.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(fausBow.item.getDynamicRange() + 30);
    if (!enemyHero) {
        return;
    }
    fauxBowTargetMap[unit.networkId] = enemyHero.networkId;
    justCasted.delay(50);
    ACTION.castSpellEntity(unit, fausBow.index, enemyHero);
}

export function doGhostMarchersLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue() || INPUT.isShiftDown()  || unit.isStealth()) {
        return;
    }
    const velo = VELOCITY_UPDATER.getVelocity(unit);
    if (velo.x == 0 && velo.y == 0) {
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

const insantariusOnCooldown = new DelayedCondition();
export function doInsantariusLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue() || unit.isStealth()) {
        return;
    }
    const insantarius = unit.getItem("Item_Insanitarius");
    if (!insantarius) {
        return;
    }

    if (!insantarius.item.canActivate()) {
        return;
    }
    function isInsantariusActive() {
        return unit.hasTool("State_Insanitarius");
    }
    if (isInsantariusActive()) {
        if (insantariusOnCooldown.isTrue()) {
            if (unit.getEnemiesInRange(950).length == 0) {
                justCasted.delay(50);
                insantariusOnCooldown.delay(200);
                ACTION.castSpell2(unit, insantarius.index);
                return;
            }

            if (unit.health < 150) {
                justCasted.delay(50);
                insantariusOnCooldown.delay(200);
                ACTION.castSpell2(unit, insantarius.index);
                ACTION.castSpell2(unit, insantarius.index);
                return;
            }
        }
        return;
    }

    if (unit.getEnemiesFightingMe(550).length == 0 && unit.getEnemiesInRange(unit.getAttackRange() + 30).length == 0) {
        return;
    }

    if (unit.getEnemiesFightingMe(550).length == 0 && unit.getEnemiesInRange(unit.getAttackRange() + 30).length == 0) {
        return;
    }

    justCasted.delay(50);
    ACTION.castSpell2(unit, insantarius.index);
    insantariusOnCooldown.delay(4800);
}

export function doShrunkensLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue() || unit.isStealth()) {
        return;
    }
    const shrunken = unit.getItem("Item_Immunity");
    if (!shrunken) {
        return;
    }
    if (!shrunken.item.canActivate()) {
        return;
    }
    if (unit.getEnemiesFightingMe(550).length == 0) {
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
    if (!armor.item.canActivate() || unit.getHealthPercent() > 75) {
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
    if (!justCasted.isTrue() || unit.isStealth()) {
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
    if (!justCasted.isTrue() || unit.isDead() || unit.isStealth() ) {
        return;
    }

    if (!INPUT.isControlDown()) return;
    
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
    if (!justCasted.isTrue() || unit.isStealth()) {
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

export function doSoulTrapLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const sourTrap = unit.getItem("Item_Soultrap");
    if (!sourTrap) {
        return;
    }

    if (!sourTrap.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(
        sourTrap.item.getDynamicRange(),
        OBJECT_MANAGER.myHero,
        (hero) => !hero.hasTool("State_Soultrap_Enemy")
    );
    if (!enemyHero) {
        return;
    }
    justCasted.delay(150);
    ACTION.castSpellEntity(unit, sourTrap.index, enemyHero);
}

export function doDreamCatcherLogic(unit: IUnitEntity, justCasted: DelayedCondition) {
    if (!justCasted.isTrue()) {
        return;
    }
    const dreamCatcher = unit.getItem("Item_Dreamcatcher");
    if (!dreamCatcher) {
        return;
    }

    if (!dreamCatcher.item.canActivate()) {
        return;
    }

    const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(
        dreamCatcher.item.getDynamicRange(),
        OBJECT_MANAGER.myHero,
        (hero) => !hero.hasTool("State_Dreamcatcher_Enemy")
    );
    if (!enemyHero || enemyHero.getHealthPercent() > 75) {
        return;
    }
    justCasted.delay(150);
    ACTION.castSpellEntity(unit, dreamCatcher.index, enemyHero);
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

    if (enemyHero.getCurrentMagicalHealth() > 170 + codex.item.level * 150) {
        return;
    }

    justCasted.delay(150);
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
