import { IUnitEntity, IHeroEntity } from "../honIdaStructs";
import { EventBus } from "eventbus-ts";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";
import { DelayedCondition } from "../utils/DelayedCondition";
import { Vector2d, Vec2 } from "../utils/Vector";
import { TARGET_SELECTOR } from "../scripts/TargetSelector";

export class IllustionController {
    private mainHero: IUnitEntity;

    private illusionOrbwalkers: Map<number, IllusionOrbwalker> = new Map();

    constructor(mainHero: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.mainHero = mainHero;
    }

    public refreshHero(mainHero: IUnitEntity) {
        this.mainHero = mainHero;
    }

    public control(justAttack: boolean = false, customAction: (illusion: IUnitEntity, orbwalker: Orbwalker) => boolean = () => false) {
        const illusions = this.getIllusions();

        illusions.forEach((ilus) => {
            let orbwalker = this.illusionOrbwalkers.get(ilus.networkId);
            if (!orbwalker) {
                orbwalker = new IllusionOrbwalker(ilus);
                this.illusionOrbwalkers.set(ilus.networkId, orbwalker);
            }
            orbwalker.refreshWalker(ilus);
            if (customAction(ilus, orbwalker)) {
                return;
            }
            orbwalker.useBrain(justAttack);
        });

        // Clean up
        const netIds = illusions.map((i) => i.networkId);
        const allIds = Array.from(this.illusionOrbwalkers.keys());
        allIds
            .filter((id) => !netIds.includes(id))
            .forEach((id) => {
                this.illusionOrbwalkers.delete(id);
            });
    }

    private getIllusions(): IUnitEntity[] {
        return OBJECT_MANAGER.heroes.filter((h) => h.typeName == this.mainHero.typeName && h.isIllusion());
    }
}

type MindLogics = "FollowAlly" | "AttackWeakest" | "Yolo";

class IllusionOrbwalker extends Orbwalker {
    private canDoLogic = new DelayedCondition();
    private canChangeMind = new DelayedCondition();
    private currentMind: MindLogics | null = null;

    private followedHero: IHeroEntity | null = null;
    private followedPosition: Vec2 | null = null;

    protected getAttackSlowTime(): number {
        return 200 + Math.random() * 100;
    }

    protected getMoveSlowTime(): number {
        return 500 + Math.random() * 100;
    }

    public useBrain(justAttack: boolean = false) {
        if (!this.canDoLogic.isTrue()) {
            return;
        }
        this.canDoLogic.delay(100);
        if (this.canChangeMind.isTrue()) {
            this.currentMind = justAttack ? "AttackWeakest" : this.getChangedMind();
            console.log(`CurrentMind after change ${this.currentMind}`);
            this.canChangeMind.delay(5500);
        }

        if (!this.currentMind) {
            return;
        }

        switch (this.currentMind) {
            case "FollowAlly":
                this.followAlly();
            case "AttackWeakest":
                this.attackWeakest();
            case "Yolo":
                this.goYolo();
        }
    }

    private followAlly() {
        if (!this.followedHero || this.followedHero.isDead) {
            const getAlliesInRange = this.walker.getAlliesInRange(2500);
            if (getAlliesInRange) {
                this.followedHero = getAlliesInRange[Math.floor(Math.random() * getAlliesInRange.length)];
            }
        }

        if (!this.followedHero) {
            if (Math.random() * 10 < 1) {
                this.orbwalk(this.walker.position.randomized(450));
                return;
            }
            return;
        }
        const followPosition = Vector2d.extendDir(this.followedHero.position, this.followedHero.facingVector(), -100);

        this.orbwalk(followPosition);
    }

    private attackWeakest() {
        if (!this.followedHero || this.followedHero.isDead()) {
            this.followedHero = TARGET_SELECTOR.getEasiestPhysicalKillInRange(this.walker.getAttackRange() + 800, this.walker.position);

            const followPosition = Vector2d.extendDir(OBJECT_MANAGER.myHero.position, OBJECT_MANAGER.myHero.facingVector(), 200);
            this.orbwalk(followPosition);
        } else {
            const followPosition = Vector2d.extendDir(this.followedHero.position, this.followedHero.facingVector(), 70);

            this.orbwalk(followPosition);
        }
    }

    private goYolo() {
        if (!this.followedPosition) {
            if (Math.random() * 10 < 1) {
                this.followedPosition = this.walker.position.randomized(1050);
                return;
            }
            this.followedPosition = null;
        }

        if (!this.followedPosition) {
            if (Math.random() * 20 < 1) {
                this.orbwalk(this.walker.position.randomized(450));
                return;
            }
            return;
        }

        this.orbwalk(this.followedPosition);
    }

    private getChangedMind(): MindLogics | null {
        const rnd = Math.random() * 100; // 0 - 100
        this.followedHero = null;
        if (rnd < 50) {
            return "FollowAlly";
        }
        if (rnd < 75) {
            return "AttackWeakest";
        }
        if (rnd < 95) {
            return "Yolo";
        }
        return null;
    }
}
