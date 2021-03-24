import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { IEntityAbility, IUnitEntity, IVisualEntity } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { TARGET_SELECTOR } from "./TargetSelector";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { tryUseAllItems } from "./Items";
import { Vector2d, Vec2 } from "../utils/Vector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { StoppableLineSpell } from "../utils/StoppableLineSpell";
import { IllustionController } from "../logics/IllusionController";
import { opPrediction, opPredictionCircular } from "./Prediction";
import { findBestCircularCast } from "../utils/BestCircularLocation";

type DragonState = 1 | 2 | 3;

export class Calamity extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

    constructor() {
        super();
        EventBus.getDefault().register(this);
    }

    doQLogic() {
        const q = this.myHero.getTool(0) as IEntityAbility;
        if (!q.canActivate() || q.level < 3 || this.myHero.getManaPercent() < 50) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 100);
        if (!enemyHero) {
            return;
        }

        const targetPos = opPrediction(this.myHero, enemyHero, 1250, 500, q.getDynamicRange(), 200);
        if (!targetPos) {
            return;
        }
        this.justCasted.delay(250);
        ACTION.castSpellPosition(this.myHero, 0, targetPos.x, targetPos.y);
    }

    private getCurrentDragonState(): DragonState | null {
        const dragon = OBJECT_MANAGER.projectiles.find((p) => p.typeName == "Projectile_Calamity_Ability2_Orbit");
        if (!dragon) {
            return null;
        }
        const distance = Vector2d.distance(dragon.position, this.myHero.position);

        if (distance < 300) {
            return 1;
        }
        if (distance < 500) {
            return 2;
        }

        return 3;
    }

    // 584 -> 434 -> 284
    // 200 - 350
    // 350 - 500
    // 500 - 650
    doDragonLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const dragonIn = this.myHero.getTool(5) as IEntityAbility;
        const dragonOut = this.myHero.getTool(6) as IEntityAbility;
        const dragonState = this.getCurrentDragonState();

        if (!dragonOut.canActivate() || !dragonState) {
            return;
        }

        const reachableEnemiesCount = this.myHero.getEnemiesInRange(660).length;
        if (reachableEnemiesCount === 0) {
            return;
        }

        const nearEnemiesCount = this.myHero.getEnemiesInRange(350).length;
        const middleEnemiesCount = this.myHero.getEnemiesInRange(500).length - nearEnemiesCount;
        const farEnemiesCount = reachableEnemiesCount - nearEnemiesCount - middleEnemiesCount;

        const getBestDragonState = (): DragonState => {
            if (nearEnemiesCount > middleEnemiesCount && nearEnemiesCount > farEnemiesCount) {
                return 1;
            }
            if (middleEnemiesCount > farEnemiesCount) {
                return 2;
            }
            return 3;
        };
        const bestState = getBestDragonState();

        if (bestState < dragonState) {
            this.justCasted.delay(200);
            ACTION.castSpell2(this.myHero, 5);
        } else {
            this.justCasted.delay(200);
            ACTION.castSpell2(this.myHero, 6);
        }
    }

    doRLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const r = this.myHero.getTool(3) as IEntityAbility;
        const range = Math.min(r.getDynamicRange(), 2000);
        if (!r.canActivate()) {
            return;
        }

        const enemies = this.myHero.getEnemiesInRange(range + 500);
        if (enemies.length < 4) {
            return;
        }
        const pos = findBestCircularCast(this.myHero, range, 450, 200, enemies, 100, 4);
        if (!pos) {
            return;
        }

        this.justCasted.delay(450);
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

        this.doDragonLogic();

        if (!INPUT.isControlDown()) return;

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} isStaffed: ${h.isStaffed()}`);
        //     // console.log(`${h.typeName} isBarbed: ${h.isBarbed()}`);
        //     // console.log(`${h.typeName} stateFlags: ${h.stateFlags}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        tryUseAllItems(this.myHero, this.justCasted);

        this.doQLogic();
        this.doRLogic();
        // this.doWLogic();
        // this.doELogic();
        // this.doWLogic();

        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
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
