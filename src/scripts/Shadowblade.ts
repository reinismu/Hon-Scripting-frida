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
import { Vector2d, Vec2, Vector } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction } from "../utils/Prediction";
import { CLIENT } from "../game/Client";
import { GRAPHICS } from "../graphics/Graphics";
import { tryGetTypeInfo } from "../objects/RTTI";
import { tryEvade } from "../logics/Evade";

export class Shadowblade extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this); 
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        // console.log(`Anim: ${this.myHero.animation}`);
        // return;
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(this.myHero.level > 2);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }
        tryEvade(this.myHero, this.orbwalker, this.justCasted)
        tryUseAllItems(this.myHero, this.justCasted);



        
        
        if (!INPUT.isControlDown()) return;
        // const typeNames = new Set();
        // OBJECT_MANAGER.entities.forEach(e => {
        //     const visEntity = new IVisualEntity(e.ptr);
        //     const typeInfo = tryGetTypeInfo(e);
        //     const distance = Vector2d.distance(this.myHero.position, visEntity.position);
        //     if(distance < 100)
        //         console.log(`${distance.toFixed(2)} - ${visEntity.typeName} : ${typeInfo?.typeName}`);
        //     // typeNames.add(typeInfo?.typeName);
        // });
        // // console.log(`${Array.from(typeNames).join(', ')}`);


        // OBJECT_MANAGER.gadgets.forEach(g => {
        //     const distance = Vector2d.distance(this.myHero.position, g.position);
        //     if(distance < 100)
        //     console.log(`${distance.toFixed(2)} - ${g.typeName}`);
        // });

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    // @Subscribe("DrawEvent")
    // onDraw() {
    //     const drawVec = Vector.extendDir(OBJECT_MANAGER.myHero.position, { ...OBJECT_MANAGER.myHero.facingVector(), z: 0}, 100);
    //     const screenpos = CLIENT.worldToScreen(drawVec);
    //     GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
    //     // console.log("draw");
    // }
    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     // if (!INPUT.isControlDown()) return;

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
