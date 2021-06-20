import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "./Items";
import { IllustionController } from "../logics/IllusionController";

export class Soulstealer extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private demonHands = [{ index: 7, range: 700 }, { index: 6, range: 450 }, { index: 5, range: 200 }];
    private illusionController = new IllustionController(this.myHero);

     constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQDemonHardLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        for (const hand of this.demonHands) {
            const tool = this.myHero.getTool(hand.index) as IEntityAbility;
            if (!tool.canActivate()) {
                continue;
            }
            const enemiesInRadius = this.areEnemiesNearPoint(Vector2d.extendDir(this.myHero.position, this.myHero.facingVector(), hand.range), 120);
            if (enemiesInRadius.length > 0) {
                const best = enemiesInRadius.sort((h1, h2) => h1.getCurrentMagicalHealth() - h2.getCurrentMagicalHealth())[0];
                this.justCasted.delay(350);
                ACTION.move(Vector2d.extendTo(this.myHero.position, best.position, 60));
                setTimeout(() => {
                    ACTION.castSpell2(this.myHero, hand.index);
                }, 150);
                return;
            }
        }
    }

    private areEnemiesNearPoint(pos: Vec2, radius: number): IHeroEntity[] {
        return OBJECT_MANAGER.heroes.filter(
            h => !h.isDead() && h.isEnemy(this.myHero) && !h.isMagicImmune() && !h.isIllusion() && Vector2d.distance(h.position, pos) < radius
        );
    }

    doGhostMarchersLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const boots = this.myHero.getItem("Item_EnhancedMarchers");
        if (!boots) {
            return;
        }
        if (!boots.item.canActivate()) {
            return;
        }
        this.justCasted.delay(50);
        ACTION.castSpell2(this.myHero, boots.index);
    }

    doShrunkensLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const shrunken = this.myHero.getItem("Item_Immunity");
        if (!shrunken) {
            return;
        }
        if (!shrunken.item.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero || Vector2d.distance(enemyHero.position, this.myHero.position) > 550) {
            return;
        }

        this.justCasted.delay(50);
        ACTION.castSpell2(this.myHero, shrunken.index);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 12);
        tryUseAllItems(this.myHero, this.justCasted);
        
        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;
        this.orbwalker.refreshWalker(this.myHero);
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`getAdjustedAttackCooldown:` +  OBJECT_MANAGER.myHero.getAdjustedAttackCooldown());
        // console.log(`getAdjustedAttackActionTime:` +  OBJECT_MANAGER.myHero.getAdjustedAttackActionTime());
        // console.log(`getAdjustedAttackDuration:` +  OBJECT_MANAGER.myHero.getAdjustedAttackDuration());
        // // console.log(`getCanAttack:` +  OBJECT_MANAGER.myHero.getCanAttack());
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // this.doWLogic();

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isPhysicalImmune: ${h.isPhysicalImmune()}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        this.doQDemonHardLogic();
        if(this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // const drawVec = Vector.extendDir(OBJECT_MANAGER.myHero.position, { ...OBJECT_MANAGER.myHero.facingVector(), z: 0}, 100);
        // const screenpos = CLIENT.worldToScreen(drawVec);
        // GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
        // console.log("draw");
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
