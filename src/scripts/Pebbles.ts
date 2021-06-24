import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular } from "../utils/Prediction";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { StoppableCircularSpell } from "../utils/StoppableCircularSpell";
import { tryUseAllItems } from "../logics/Items";
import { throws } from "assert";

export class Pebbles extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private target: IHeroEntity | undefined = undefined;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = this.target ? this.target : TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        const dist = this.myHero.position.distance2d(enemyHero.position);
        const targetPos = opPredictionCircular(this.myHero, enemyHero, 100 + dist / 1200, q.getDynamicRange(), 1);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(350);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
        this.target = enemyHero;
        setTimeout(() => {
            this.target = undefined;
        }, 2000);
    }

    private getWDamage(): number {
        const w = this.myHero.getTool(1) as IEntityAbility;
        const damages = [0, 70, 140, 210, 280];
        return damages[w.level] || 0;
    }

    private getWTarget() {
        const slot = this.myHero.isStaffed() ? 3 : 1;
        const w = this.myHero.getTool(slot) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const throwable = this.myHero
            .getAllOthersInRange(300)
            .filter((e) => !e.isInvulnerable() && !e.isMagicImmune())
            .sort((h1, h2) => h1.position.distance2d(this.myHero.position) - h2.position.distance2d(this.myHero.position))[0];
        if (!throwable) {
            return;
        }

        const enemyHero = this.target ? this.target : TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        const enemyHeroThrowable = (throwable instanceof IHeroEntity && this.myHero.isEnemy(throwable)) ? 1 : 0

        const dist = this.myHero.position.distance2d(enemyHero.position);
        if (dist < 300 || enemyHero.getCurrentMagicalHealth() < this.getWDamage() || enemyHero.getAlliesInRange(350).length >= 2 - enemyHeroThrowable) {
            return enemyHero;
        }
        return undefined;
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const slot = this.myHero.isStaffed() ? 3 : 1;
        const w = this.myHero.getTool(slot) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }

        const enemyHero = this.getWTarget();
        if (!enemyHero) {
            return;
        }
        this.target = enemyHero;
        setTimeout(() => {
            this.target = undefined;
        }, 2000);

        this.justCasted.delay(250);
        ACTION.castSpellEntity(this.myHero, slot, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
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

        tryUseAllItems(this.myHero, this.justCasted);
        this.doQLogic();
        this.doWLogic();

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }
}
