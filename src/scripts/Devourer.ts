import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER, ObjectManager } from "../objects/ObjectManager";
import { Vec2, Vector } from "../utils/Vector";
import { shitPrediction } from "./Prediction";
import { RESOURCE_MANAGER } from "../objects/ResourceManager";

function sqr(x: number) {
    return x * x;
}

function dist2(v: Vec2, w: Vec2) {
    return sqr(v.x - w.x) + sqr(v.y - w.y);
}

function distToSegmentSquared(p: Vec2, v: Vec2, w: Vec2) {
    var l2 = dist2(v, w);

    if (l2 == 0) return dist2(p, v);

    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;

    if (t < 0) return dist2(p, v);
    if (t > 1) return dist2(p, w);

    return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}

function distToSegment(p: Vec2, v: Vec2, w: Vec2) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
}

export class Devourer extends Script {
    private lastCast = 0;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private canHit(unit: IUnitEntity, collisionEntities: IUnitEntity[], hookRadius: number, hookRange: number) {
        const targetPos = shitPrediction(unit, 100);
        console.log(`q collistion entity count: ${collisionEntities.length}`);
        if (Vector.distance2d(targetPos, this.myHero.position) > hookRange) {
            return false;
        }
        const startPos = this.myHero.position;
        if (
            collisionEntities.some(
                u =>
                    !u.ptr.equals(this.myHero.ptr) &&
                    !u.ptr.equals(unit.ptr) &&
                    distToSegmentSquared(u.position, startPos, targetPos) < sqr(hookRadius + u.boundingRadius)
            )
        ) {
            return false;
        }
        return true;
    }

    doQLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate()) {
            return;
        }
        const range = q.getDynamicRange() + 20;
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(range);
        if (!enemyHero) {
            return;
        }
        console.log(`q target: ${enemyHero.typeName}`);
        const heroes = OBJECT_MANAGER.heroes as IUnitEntity[];
        const creeps = OBJECT_MANAGER.creeps as IUnitEntity[];
        const neutrals = OBJECT_MANAGER.neutrals as IUnitEntity[];
        const collisionEntities = heroes
            .concat(creeps, neutrals)
            .filter(u => !u.isDead() && u.position.distance2dSqr(this.myHero.position) < range * range);
        if (!this.canHit(enemyHero, collisionEntities, 70, range)) {
            return;
        }
        const targetPos = shitPrediction(enemyHero, 100);
        this.lastCast = Date.now();
        console.log("now: " + this.lastCast);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
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
        this.doQLogic();
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
