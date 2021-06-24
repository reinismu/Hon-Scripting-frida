import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, IVisualEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "../logics/Items";
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction, opPredictionCircular } from "../utils/Prediction";
import { findBestCircularCast } from "../utils/BestCircularLocation";

type ArcaneMode = "HEALING" | "DAMAGE";

export class Artesia extends Script {
    private canCast = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);
    private missle = new StoppableLineSpell(this.canCast);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }

        const range = q.getDynamicRange() + 50;
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(range);
        if (!enemyHero) {
            return;
        }

        if (this.getCurrentArcaneMode() === "HEALING") {
            this.switchMode("DAMAGE");
            return;
        }

        const isDancing = this.usingDanceOfDeath();
        this.missle.cast(
            q,
            0,
            this.myHero,
            enemyHero,
            isDancing ? 1600 : 1100,
            75,
            (spell: IEntityAbility, caster: IUnitEntity, target: IUnitEntity, castPos: Vec2) => {
                if (isDancing) {
                    return true;
                }
                const castRange = spell.getDynamicRange() + 20;
                const castRadius = 75;

                const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
                const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];

                const collisionEntities = creeps
                    .concat(neutrals)
                    .filter((u) => !u.isDead() && u.isEnemy(this.myHero) && u.position.distance2dSqr(caster.position) < castRange * castRange);

                if (Vector2d.distance(castPos, caster.position) > castRange) {
                    return false;
                }
                const startPos = caster.position;
                if (
                    collisionEntities.some(
                        (u) =>
                            !u.ptr.equals(caster.ptr) &&
                            !u.ptr.equals(target.ptr) &&
                            Vector2d.distToSegmentSquared(u.position, startPos, castPos) <
                                (castRadius + u.boundingRadius) * (castRadius + u.boundingRadius)
                    )
                ) {
                    return false;
                }
                return true;
            },
            null,
            null,
            false
        );
    }

    doSmartSwitch() {
        if (!this.canCast.isTrue() && this.getBoltCharges() > 0) {
            return;
        }

        if (this.myHero.getEnemiesInRange(800).filter((h) => !h.isMagicImmune()).length > 0) {
            this.switchMode("DAMAGE");
        } else if (this.myHero.getAllAlliesInRange(800).length > 0) {
            this.switchMode("HEALING");
        }
    }

    switchMode(mode: ArcaneMode) {
        if (!this.canCast.isTrue() || mode === this.getCurrentArcaneMode()) {
            return;
        }
        const e = this.myHero.getTool(2) as IEntityAbility;
        if (!e.canActivate()) {
            return;
        }

        this.canCast.delay(50);
        ACTION.castSpell2(this.myHero, 2);
    }

    private getCurrentArcaneMode(): ArcaneMode {
        if (this.myHero.hasTool("State_Artesia_Ability3_ModeSwitch")) {
            return "HEALING";
        }

        return "DAMAGE";
    }

    private getBoltCharges(): number {
        const e = this.myHero.getTool(2) as IEntityAbility;
        return e.getCharges();
    }

    private usingDanceOfDeath(): boolean {
        return this.myHero.hasTool("State_Artesia_Ability2");
    }

    private isProjectionOn(): boolean {
        return this.myHero.hasTool("State_Artesia_Ability4_Cooldown");
    }

    doRLogic() {
        if (!this.canCast.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        const range = Math.min(r.getDynamicRange(), 2000);
        if (!r.canActivate() || !this.isProjectionOn()) {
            return;
        }

        const enemies = this.myHero.getEnemiesInRange(range + 500);
        if (enemies.length < 4) {
            return;
        }
        const pos = findBestCircularCast(this.myHero, range, 450, 200, enemies, 100, 2);
        if (!pos) {
            return;
        }

        this.canCast.delay(450);
        ACTION.castSpellPosition(this.myHero, 3, pos.x, pos.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 12);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (!INPUT.isControlDown()) return;
        // OBJECT_MANAGER.heroes.forEach((h) => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        tryUseAllItems(this.myHero, this.canCast);


        this.doRLogic();
        this.doSmartSwitch();
        this.doQLogic();
        // this.doWLogic();
        // this.doELogic();
        // this.doWLogic();

        if (this.canCast.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition, this.usingDanceOfDeath());
        }
    }

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     // if (!INPUT.isControlDown()) return;

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
