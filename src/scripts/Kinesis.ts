import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity, Console } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector, Vector2d } from "../utils/Vector";
import { shitPrediction, goodPrediction, opPrediction } from "./Prediction";
import { RESOURCE_MANAGER } from "../objects/ResourceManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";

export class Kinesis extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private lastCast = 0;
    // HOOK stuff
    private canNotStop = new DelayedCondition();
    private hookCastPosition: Vec2 | null = null;
    private hookTarget: IUnitEntity | null = null;
    private hookTargetAnimationIndex = 0;
    private turnToTargetDelay: number = 0;
    private canStopCheck = new DelayedCondition();

    private justCasted = new DelayedCondition();
    private justCastedR = new DelayedCondition();

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private canHit(unit: IUnitEntity, shootPos: Vec2, collisionEntities: IUnitEntity[], hookRadius: number, hookRange: number) {
        // console.log(`q collistion entity count: ${collisionEntities.length}`);
        if (Vector2d.distance(shootPos, this.myHero.position) > hookRange) {
            return false;
        }
        const startPos = this.myHero.position;
        if (
            collisionEntities.some(
                u =>
                    !u.ptr.equals(this.myHero.ptr) &&
                    !u.ptr.equals(unit.ptr) &&
                    Vector2d.distToSegmentSquared(u.position, startPos, shootPos) <
                        (hookRadius + u.boundingRadius) * (hookRadius + u.boundingRadius)
            )
        ) {
            return false;
        }
        return true;
    }

    // Check for 3 weakest heroes
    doDevourerQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        if (!this.canNotStop.isTrue() && this.canStopCheck.isTrue() && this.hookCastPosition && this.hookTarget) {
            this.canStopCheck.delay(50);
            if (this.hookTargetAnimationIndex != this.hookTarget.animation) {
                this.stopHook();
                return;
            }
            // console.log(`msPassed: ` + this.canNotStop.msPassed());
            const targetPos = this.getQPredictionPos(q, this.hookTarget, this.turnToTargetDelay - this.canNotStop.msPassed());
            if (!targetPos) {
                this.stopHook();
                return;
            }
            const deviation = Vector2d.distToSegment(targetPos, this.myHero.position, this.hookCastPosition);
            // console.log("Deviation: " + deviation);
            if (deviation > 100) {
                this.stopHook();
                return;
            }
        }
        if (this.lastCast + 500 > Date.now()) {
            return;
        }
        const range = q.getDynamicRange() + 20;
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(range);
        if (!enemyHero) {
            return;
        }

        const targetPos = this.getQPredictionPos(q, enemyHero, this.orbwalker.msToTurnToPos(enemyHero.position));
        if (!targetPos) {
            return;
        }

        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
        this.justCasted.delay(500);
        this.lastCast = Date.now();
        this.hookCastPosition = targetPos;
        this.hookTarget = enemyHero;
        this.hookTargetAnimationIndex = enemyHero.animation;
        this.turnToTargetDelay = this.orbwalker.msToTurnToPos(targetPos);
        this.canNotStop.delay(350 + this.turnToTargetDelay);
    }

    private stopHook() {
        ACTION.stop(this.myHero);
        console.log(`Stop Hook`);
        this.turnToTargetDelay = 0;
        this.hookCastPosition = null;
        this.hookTarget = null;
        this.canNotStop.restart();
    }

    private getQPredictionPos(q: IEntityAbility, target: IUnitEntity, additionalDelay: number = 0): Vec2 | null {
        const range = q.getDynamicRange() + 20;

        const heroes = OBJECT_MANAGER.heroes as IUnitEntity[];
        const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
        const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];

        const collisionEntities = heroes
            .concat(creeps, neutrals)
            .filter(u => !u.isDead() && u.position.distance2dSqr(this.myHero.position) < range * range);

        const targetPos = opPrediction(this.myHero, target, 1600, 500 + additionalDelay, range, 55);
        if (!targetPos) {
            return null;
        }

        if (!this.canHit(target, targetPos, collisionEntities, 75, range)) {
            return null;
        }

        return targetPos;
    }

    private doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        if (q.typeName == "Ability_Devourer1") {
            this.doDevourerQLogic();
            return;
        } else if (q.typeName == "Ability_Kenisis1") {
            if (!this.justCasted.isTrue()) {
                return;
            }
            const dev = OBJECT_MANAGER.heroes.find(
                h => h.typeName == "Hero_Devourer" && Vector2d.distance(h.position, this.myHero.position) + 20 < q.getDynamicRange()
            );
            if (dev) {
                this.justCasted.delay(80);
                ACTION.castSpellEntity(this.myHero, 0, dev);
                return;
            }
        }
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(w.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        this.justCasted.delay(80);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doRLogic() {
        if (!this.justCastedR.isTrue() || !this.justCastedR.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        if (!r.canActivate()) {
            return;
        }
        if(this.myHero.hasTool("State_Kenisis_Ability4_Modifier")) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(r.getDynamicRange() + 20);
        if (!enemyHero || enemyHero.getHealthPercent() < 25) {
            return;
        }

        this.justCastedR.delay(1000);
        ACTION.castSpellEntity(this.myHero, 3, enemyHero);
    }

    doSilenceLogic() {
        if (this.lastCast + 50 > Date.now()) {
            return;
        }
        const silence = this.myHero.getItem("Item_Silence");
        if (!silence) {
            return;
        }
        if (!silence.item.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(silence.item.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        this.lastCast = Date.now();
        ACTION.castSpellEntity(this.myHero, silence.index, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`myHero: ` + OBJECT_MANAGER.myHero.ptr);

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} getCurrentAnimIndex: ` + h.skeleton.getCurrentAnimIndex());
        // });
        // OBJECT_MANAGER.creeps.forEach(h => {
        //     console.log(`creep:${h.typeName} ${h.boundingRadius}`);
        // });
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });
        this.doQLogic();
        this.doRLogic();
        this.doWLogic();
        this.doSilenceLogic();
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting
        // const buffer = new MyBuffer(args[1]);
        // const data = new Uint8Array(buffer.dataBuffer);
        // console.log(data);
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // console.log("draw");
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     if (h.isIllusion()) {
        //         const screenPos = CLIENT.worldToScreen(h.position);
        //         GRAPHICS.drawRect(screenPos.x, screenPos.y, 10, 10);
        //     }
        // });
    }

    @Subscribe("RequestStartAnimEvent")
    onAnimationStart(args: NativePointer[]) {
        // Dont update state if we are shooting
        // console.log(`RequestStartAnimEvent: ${args[1]} ${args[1].read32BitString()}`);
    }
}
