import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Thunderbringer extends Script {
    private lastCast = 0;

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.isReady()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero) {
            return;
        }
        if (enemyHero.position.distance2d(this.myHero.position) > 850) {
            return;
        }
        this.lastCast = Date.now();
        console.log("now: " + this.lastCast);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.isReady()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero) {
            return;
        }
        if (enemyHero.position.distance2d(this.myHero.position) > 700) {
            return;
        }
        this.lastCast = Date.now();
        console.log("now: " + this.lastCast);
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (!INPUT.isControlDown()) return;
        // console.log(`cachedHeroes:` + OBJECT_MANAGER.heroes.length);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`myHero:` + OBJECT_MANAGER.myHero);
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        this.doQLogic();
        // this.doWLogic();
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // GRAPHICS.drawRect(0, 0, 100, 100);
        // console.log("draw");
    }
}