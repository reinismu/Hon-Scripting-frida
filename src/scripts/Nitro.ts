import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IUnitEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "./TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { IGAME } from "../game/Globals";
import { Vec3, Vector, Vector2d } from "../utils/Vector";
import { shitPrediction } from "./Prediction";
import { Orbwalker } from "./Orbwalker";
import { VELOCITY_UPDATER } from "../objects/VelocityUpdater";

export class Nitro extends Script {
    private orbwalker = new Orbwalker(this.myHero);
    private delayCastQ = false;
    private forceSnapshotSend = false;
    private myHeroCached: IUnitEntity | null = null;
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
        if (!q.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() + 80);
        if (!enemyHero) {
            return;
        }

        const castLocation = shitPrediction(enemyHero);
        if (this.delayCastQ) {
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            console.log(`Cast Q ${Date.now()}`);
            ACTION.castSpell(this.myHero, 0);
            this.lastCast = Date.now();
        } else {
            this.delayCastQ = true;
            this.forceSnapshotSend = true;
            CLIENT.sendFakeMousePosToServer(castLocation.x, castLocation.y, castLocation.z);
            this.forceSnapshotSend = false;
            setTimeout(() => {
                this.delayCastQ = false;
            }, 250);
        }
    }

    doLexLogic() {
        if (this.lastCast + 50 > Date.now()) {
            return;
        }
        const lex = this.myHero.getItem("Item_LexTalionis");
        if (!lex) {
            return;
        }
        if (!lex.item.canActivate()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(lex.item.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        this.lastCast = Date.now();
        ACTION.castSpellEntity(this.myHero, lex.index, enemyHero);
    }

    doGhostMarchersLogic() {
        if (this.lastCast + 50 > Date.now()) {
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

    doShrunkensLogic() {
        if (this.lastCast + 50 > Date.now()) {
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

        ACTION.castSpell2(this.myHero, shrunken.index);
    }

    doElderLogic() {
        if (this.lastCast + 50 > Date.now()) {
            return;
        }
        const elder = this.myHero.getItem("Item_ElderParasite");
        if (!elder) {
            return;
        }
        if (!elder.item.canActivate()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange());
        if (!enemyHero) {
            return;
        }
        ACTION.castSpell2(this.myHero, elder.index);
    }

    doGeometersLogic() {
        if (this.lastCast + 50 > Date.now()) {
            return;
        }
        const geo = this.myHero.getItem("Item_ManaBurn2");
        if (!geo) {
            return;
        }
        if (!geo.item.canActivate()) {
            return;
        }
        const q = this.myHero.getTool(0) as IEntityAbility;
        const enemyHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(q.getDynamicRange() - 200);
        if (!enemyHero) {
            return;
        }
        ACTION.castSpell2(this.myHero, geo.index);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        // IGAME.mysteriousStruct.drawIndicatorFlag = 1;
        if (!INPUT.isControlDown()) return;
        // console.log(`drawIndicatorFlag:` + IGAME.mysteriousStruct.drawIndicatorFlag);
        // console.log(`cachedEntities:` + OBJECT_MANAGER.heroes.length);
        // console.log(`Entities:` + OBJECT_MANAGER.entitiesCount);
        // console.log(`MyVelocity: ` + Vector2d.length(VELOCITY_UPDATER.getVelocity(this.myHero)));
        // console.log(`moveSpeed: ` + this.myHero.getMoveSpeed(true));
        // const checkVec = { ...this.myHero.facingVector(), z: 0 };
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     // console.log(`${h.typeName} isInvulnerable: ${h.isInvulnerable()}`);
        //     console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        // console.log(`getCurrentPhysicalHealth:${this.myHero.getCurrentPhysicalHealth()}`);
        // console.log(`getPhysicalResistance:${this.myHero.getPhysicalResistance()}`);
        // this.doShrunkensLogic()
        // this.doLexLogic();
        // this.doGhostMarchersLogic();
        // this.doElderLogic();
        // this.doGeometersLogic();
        // this.doQLogic();
        this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition, true);
    }

    @Subscribe("DrawEvent")
    onDraw() {
        OBJECT_MANAGER.heroes.forEach(h => {
            const velocity = VELOCITY_UPDATER.getVelocity(h);
            const drawVec = CLIENT.worldToScreen(Vector.add(h.position, { ...velocity, z: 0 }));
            GRAPHICS.drawRect(drawVec.x, drawVec.y, 8, 8);
        });
        // console.log("draw");
    }

    @Subscribe("SendClientSnapshotEvent")
    onSendClientSnapshot(args: NativePointer[]) {
        if (!INPUT.isControlDown()) return;
        // Dont update state if we are shooting

        const buffer = new MyBuffer(args[1]);
        const data = new Uint8Array(buffer.dataBuffer);

        if (this.delayCastQ && !this.forceSnapshotSend) {
            buffer.size = 0;
            buffer.allocatedSize = 0;
        }
    }

    // @Subscribe("SendGameDataEvent")
    // onSendGameDataEvent(args: NativePointer[]) {
    //     if (!INPUT.isControlDown()) return;
    //     // Dont update state if we are shooting

    //     const buffer = new MyBuffer(args[1]);
    //     const data = new Uint8Array(buffer.dataBuffer);
    //     console.log(data);
    // }
}
