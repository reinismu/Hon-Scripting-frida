import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback, IGadgetEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular } from "./Prediction";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";
import { tryUseAllItems } from "./Items";
import { findBestLinearCast } from "../utils/BestLinearCastLocation";

export class Parallax extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private gadget: IGadgetEntity | null = null;

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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 50);
        if (!enemyHero || !this.gadget) {
            return;
        }
        const castPos = opPrediction(this.gadget, enemyHero, 2000, this.myHero.getMsToTurnToPos(enemyHero.position), 4000, 50);
        if (!castPos || Vector2d.distance(this.myHero.position, castPos) > q.getDynamicRange()) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, castPos.x, castPos.y);
    }

    doQMaxHitLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        if (!this.gadget) {
            return;
        }
        const goodEnemies = this.myHero.getEnemiesInRange(q.getDynamicRange()).filter( (ene) => !ene.isMagicImmune() && !ene.isInvulnerable());
        const castPos = findBestLinearCast(this.gadget, 4000, 40, 100, 2000, goodEnemies, 1);
        if (!castPos || Vector2d.distance(this.myHero.position, castPos) > q.getDynamicRange()) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, castPos.x, castPos.y);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate() || !this.gadget) {
            return;
        }
        const msTillGadget = Vector2d.distance(this.myHero.position, this.gadget.position) / 2;
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(200, this.gadget);
        if (!enemyHero) {
            return;
        }
        const eneVelocity = VELOCITY_UPDATER.getVelocity(enemyHero);
        const enemyPositionAfterDelay = Vector2d.add(enemyHero.position, Vector2d.mul(eneVelocity, msTillGadget / 1000));
        if (Vector2d.distance(enemyPositionAfterDelay, this.gadget.position) > 230) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpell2(this.myHero, 1);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.gadget = OBJECT_MANAGER.gadgets.find(g => g.typeName == "Gadget_Parallax_Ability1") || null;
        if (INPUT.isCharDown("C")) {
            this.doQMaxHitLogic();
            if (this.justCasted.isTrue()) {
                this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
            }
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
        // OBJECT_MANAGER.gadgets.forEach(h => {
        //     console.log(`gadget: ${h.typeName} -> ${new NativePointer(h.field_B8)} : me ${this.player.networkId}`);
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

        tryUseAllItems(this.myHero, this.justCasted);
        this.doWLogic();
        this.doQLogic();


        if (this.justCasted.isTrue()) {
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
