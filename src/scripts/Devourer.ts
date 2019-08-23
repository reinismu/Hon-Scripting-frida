import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
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

export class Devourer extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private lastCast = 0;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    private canHit(unit: IUnitEntity, shootPos: Vec2, collisionEntities: IUnitEntity[], hookRadius: number, hookRange: number) {
        console.log(`q collistion entity count: ${collisionEntities.length}`);
        if (Vector2d.distance(shootPos, this.myHero.position) > hookRange) {
            return false;
        }
        const startPos = this.myHero.position;
        if (
            collisionEntities.some(
                u =>
                    !u.ptr.equals(this.myHero.ptr) &&
                    !u.ptr.equals(unit.ptr) &&
                    Vector2d.distToSegmentSquared(u.position, startPos, shootPos) < (hookRadius + u.boundingRadius) * (hookRadius + u.boundingRadius)
            )
        ) {
            return false;
        }
        return true;
    }
    //Cancel if see that it wont hit
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

        const targetPos = opPrediction(this.myHero, enemyHero, 1600, 500, range, 65);
        if (!targetPos) {
            return;
        }
        if (!this.canHit(enemyHero, targetPos, collisionEntities, 75, range)) {
            return;
        }
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
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
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
