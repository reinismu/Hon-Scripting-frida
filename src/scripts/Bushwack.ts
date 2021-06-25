import { Script } from "./Scripts";
import { EventBus, Subscribe } from "eventbus-ts";
import { GRAPHICS } from "../graphics/Graphics";
import { IEntityAbility, IHeroEntity, IFileChangeCallback } from "../honIdaStructs";
import { ACTION, MyBuffer } from "../actions/Action";
import { INPUT } from "../input/Input";
import { CLIENT } from "../game/Client";
import { TARGET_SELECTOR } from "../logics/TargetSelector";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "../logics/Orbwalker";
import { IGAME } from "../game/Globals";
import { Vector, Vec2, Vector2d } from "../utils/Vector";
import { DelayedCondition } from "../utils/DelayedCondition";
import { opPrediction, opPredictionCircular, unitPositionPrediction } from "../utils/Prediction";
import { tryUseAllItems } from "../logics/Items";
import { IllustionController } from "../logics/IllusionController";
import { circleIntersection } from "../utils/Circle";
import { tryEvade } from "../logics/Evade";

export class Bushwack extends Script {
    private justCasted = new DelayedCondition();
    private orbwalker = new Orbwalker(this.myHero);
    private illusionController = new IllustionController(this.myHero);

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
        const enemyHero = TARGET_SELECTOR.getEasiestMagicalKillInRange(q.getDynamicRange() + 20);
        if (!enemyHero) {
            return;
        }

        const dist = Vector2d.distance(enemyHero.position, this.myHero.position);
        if (!this.orbwalker.canMove.isTrue() && dist < this.myHero.getAttackRange() + 30) {
            return;
        }

        this.justCasted.delay(250);
        ACTION.castSpellEntity(this.myHero, 0, enemyHero);
    }

    doWLogic() {
        if (!this.justCasted.isTrue()) {
            return;
        }
        const w = this.myHero.getTool(1) as IEntityAbility;
        if (!w.canActivate() || w.level < 3 || !this.orbwalker.canMove.isTrue()) {
            return;
        }
        const enemyHero = TARGET_SELECTOR.getClosestEnemyHero();
        if (!enemyHero) {
            return;
        }
        const dist = Vector2d.distance(enemyHero.position, this.myHero.position);

        if (this.orbwalker.canAttack.isTrue() && dist < this.myHero.getAttackRange() + 30) {
            return;
        }
        if (dist > 900) {
            return;
        }

        // Extend to mouse pos 400
        // Predict all enemy hero locations 400 ms
        // Draw circle of my attack range around them
        // Draw E circle around me
        // Find all crosspoints
        // Filter if it is in allowed angle
        // Find safest point
        // If yes jump there
        // Otherwiae jump dirrectly to mouse

        const mousePosition = IGAME.mysteriousStruct.mousePosition;

        const distToCast = Vector2d.distance(mousePosition, this.myHero.position);
        if (distToCast < 200) {
            return;
        }

        const enemyHeroes = this.myHero.getEnemiesInRange(1000);
        const wCircle = {
            center: this.myHero.position,
            radius: w.getDynamicRange(),
        };

        const bestJumpPoint: Vec2 | undefined = enemyHeroes
            .map((h) => {
                const predPos = unitPositionPrediction(h, 300);
                const enemyAttackCircle = {
                    center: predPos,
                    radius: this.myHero.getAttackRange(),
                };

                return circleIntersection(wCircle, enemyAttackCircle);
            })
            .flat()
            .sort((p1, p2) => Vector2d.distanceSqr(p1, mousePosition) - Vector2d.distanceSqr(p2, mousePosition))[0];

        const jumpTo = (pos: Vec2) => {
            this.justCasted.delay(100 + this.myHero.getMsToTurnToPos(pos));
            ACTION.castSpellPosition(this.myHero, 1, pos.x, pos.y);
        };

        if (!bestJumpPoint) {
            jumpTo(mousePosition);
            return;
        }
        const mouseAfterCastPosition = Vector2d.extendTo(this.myHero.position, mousePosition, w.getDynamicRange());

        const posDist = Vector2d.distance(bestJumpPoint, mouseAfterCastPosition);
        console.log(`posDist ${posDist}`);
        if (posDist > 250) {
            jumpTo(mousePosition);
            return;
        }

        jumpTo(bestJumpPoint);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        this.orbwalker.refreshWalker(this.myHero);
        this.illusionController.refreshHero(this.myHero);
        this.illusionController.control(true);

        if (INPUT.isCharDown("C")) {
            this.orbwalker.lastHit(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        if (INPUT.isCharDown("V")) {
            this.orbwalker.laneClear(IGAME.mysteriousStruct.mousePosition);
            return;
        }

        tryEvade(this.myHero, this.orbwalker, this.justCasted, (proj) => {
            const w = this.myHero.getTool(1) as IEntityAbility;
            if (!w.canActivate()) {
                return;
            }
            this.justCasted.delay(200);
            const pos = this.myBase.position;
            ACTION.castSpellPosition(this.myHero, 1, pos.x, pos.y);
        });

        if (!INPUT.isControlDown()) return;
        // console.log(`isButtonDown ${"A".charCodeAt(0)}:` + INPUT.isCharDown("A"));
        // console.log(`getFinalMinAttackDamage:` + this.myHero.getFinalMinAttackDamage());
        // console.log(`getFinalMaxAttackDamage:` + this.myHero.getFinalMaxAttackDamage());

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
        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`isAlive: ${h.isAlive}`);
        // });
        // this.doWLogic();

        // OBJECT_MANAGER.heroes.forEach(h => {
        //     console.log(`${h.typeName} ownerId: ${h.ownerId}`);
        //     for (let i = 0; i < 80; i++) {
        //         const tool = h.getTool(i);
        //         if (tool == null) continue;
        //         console.log(`tool ${i}: ${tool.typeName}`);
        //     }
        // });

        // OBJECT_MANAGER.projectiles.forEach((h) => {
        //     console.log(`${h.typeName} - ${h.ownerId}`);
        // });
        tryUseAllItems(this.myHero, this.justCasted);
        this.doQLogic();
        this.doWLogic();

        // this.doQDemonHardLogic();
        // this.doGhostMarchersLogic();
        if (this.justCasted.isTrue()) {
            this.orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        }
    }

    @Subscribe("DrawEvent")
    onDraw() {
        const w = this.myHero.getTool(1) as IEntityAbility;
        const mousePosition = IGAME.mysteriousStruct.mousePosition;
        const enemyHeroes = this.myHero.getEnemiesInRange(1000);
        const wCircle = {
            center: this.myHero.position,
            radius: w.getDynamicRange(),
        };

        const bestJumpPoints = enemyHeroes
            .map((h) => {
                const predPos = unitPositionPrediction(h, 400);
                const enemyAttackCircle = {
                    center: predPos,
                    radius: this.myHero.getAttackRange() + 40,
                };

                return circleIntersection(wCircle, enemyAttackCircle);
            })
            .flat();
        // .sort((p1, p2) => Vector2d.distanceSqr(p1, mousePosition) - Vector2d.distanceSqr(p2, mousePosition))[0];
        bestJumpPoints.forEach((point) => {
            const screenpos = CLIENT.worldToScreen({ ...point, z: this.myHero.position.z });
            GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
        });
        // Projectile_Devourer_Ability1
        // Projectile_Prisoner_Ability1
        // Projectile_Prisoner_Ability1_Return_Art
        // Projectile_Valkyrie_Ability2
        // Projectile_Gauntlet_Ability2

        // OBJECT_MANAGER.projectiles.forEach((p) => {
        //     if (p.typeName === "Projectile_Valkyrie_Ability2") {
        //         const toPosDir = Vector2d.extendDir(p.position, p.facingVector(), 400);
        //         const screenpos = CLIENT.worldToScreen({ ...toPosDir, z: p.position.z });
        //         // console.log(`vec: ${p.ptr}`);
        //         GRAPHICS.drawRect(screenpos.x, screenpos.y, 10, 10);
        //     }
        // });
        // const drawVec = Vector.extendDir(OBJECT_MANAGER.myHero.position, { ...OBJECT_MANAGER.myHero.facingVector(), z: 0}, 100)
        // console.log("draw");
    }

    @Subscribe("SendGameDataEvent")
    onSendGameDataEvent(args: NativePointer[]) {
        // Delay automatic actions if manual was preformed
        this.justCasted.delay(100);
    }
}
