import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IHeroEntity } from "../honIdaStructs";
import { ACTION } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";
import { IllustionController } from "../logics/IllusionController";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Magebane extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private getRPercent(level: number): number {
        return [0, 1, 1.3, 1.6][level];
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }

        const dmgOnEnemy = (ene: IHeroEntity) => {
            const missingMana = ene.getMaxMana() - ene.getMana();
            return missingMana * this.getRPercent(r.level);
        };

        const enemyHero = OBJECT_MANAGER.heroes
            .filter(
                (h) =>
                    h.health > 0 &&
                    !h.isIllusion() &&
                    h.isEnemy(this.myHero) &&
                    h.position.distance2d(this.myHero.position) < r.getDynamicRange() &&
                    !h.isMagicImmune() &&
                    !h.isInvulnerable()
            )
            .sort((h1, h2) => dmgOnEnemy(h2) - dmgOnEnemy(h1))[0];

        if (!enemyHero) {
            return;
        }

        if (dmgOnEnemy(enemyHero) - 30 < enemyHero.getCurrentMagicalHealth()) {
            return;
        }
        this.justCasted.delay(300);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(true);

        tryUseAllItems(this.myHero, this.justCasted);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }
        if (this.orbwalker.canAttack.isTrue()) {
            this.doRLogic();
        }

        if (!INPUT.isControlDown()) return;

        // const spell = this.myHero.getTool(0) as IEntityAbility;
        // console.log(`typeName:` + this.myHero.typeName);
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`getRDamage:` + this.getRDamage());
        // console.log(`getDynamicRange:` + spell.getDynamicRange());
        // console.log(`getAdjustedActionTime:` +  spell.getAdjustedActionTime());
        // console.log(`getAdjustedAttackActionTime:` +  OBJECT_MANAGER.myHero.getAdjustedAttackActionTime());
        // console.log(`getAdjustedAttackDuration:` +  OBJECT_MANAGER.myHero.getAdjustedAttackDuration());
        // // console.log(`getCanAttack:` +  OBJECT_MANAGER.myHero.getCanAttack());
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // this.doWLogic();

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });


        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent() {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }
}
