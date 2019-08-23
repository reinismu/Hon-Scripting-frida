import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector } from "../utils/Vector";

export class Thunderbringer extends Script {
    private lastCast = 0;
    private orbwalker = new Orbwalker(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;

        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }
        this.lastCast = Date.now();
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (this.lastCast + 100 > Date.now()) {
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

        this.lastCast = Date.now();
        ACTION.castSpellEntity(this.myHero, 1, enemyHero);
    }

    doGhostMarchersLogic() {
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        const boots = this.myHero.getItem("Item_EnhancedMarchers");
        if (!boots) {
            return;
        }
        if (!boots.item.canActivate()) {
            return;
        }
        ACTION.castSpell2(this.myHero, boots.index);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (!INPUT.isControlDown()) return;
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
        this.doQLogic();
        this.doWLogic();
        this.doGhostMarchersLogic();
        if (this.lastCast + 100 > Date.now()) {
            return;
        }
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
    }

    @Subscribe("DrawEvent")
    onDraw() {
        // const drawVec = Vector.extendTo(OBJECT_MANAGER.myHero.position, IGAME.mysteriousStruct.mousePosition, 100); 
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
