import { IUnitEntity } from "../honIdaStructs";
import { Vec2, Vector2d } from "../utils/Vector";
import { EventBus, Subscribe } from "eventbus-ts";
import { OBJECT_MANAGER } from "./ObjectManager";
import { DelayedCondition } from "../utils/DelayedCondition";

interface PastPositionRecord {
    timestamp: number;
    pos: Vec2;
}

const POSITION_COUNT_TO_KEEP = 3;
const POSITION_RECORD_DELTA_TIME_MS = 50;

class VelocityUpdater {
    private heroPastPositionMap = new Map<number, PastPositionRecord[]>();
    private canRecord = new DelayedCondition();

    constructor() {
        EventBus.getDefault().register(this);
    }

    getVelocity(unit: IUnitEntity): Vec2 {
        const posRecords = this.heroPastPositionMap.get(unit.networkId);
        if (!posRecords || posRecords.length < POSITION_COUNT_TO_KEEP) {
            return { x: 0, y: 0 };
        }

        const lastPos = posRecords[posRecords.length - 1];
        const beforeLastPos = posRecords[posRecords.length - 2];
        if (lastPos.pos.x == beforeLastPos.pos.x && lastPos.pos.x == beforeLastPos.pos.x) {
            return { x: 0, y: 0 };
        }
        const vecDelta = Vector2d.sub(lastPos.pos, beforeLastPos.pos);
        return Vector2d.mul(Vector2d.normalized(vecDelta), unit.getMoveSpeed(true));
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (!this.canRecord.isTrue()) {
            return;
        }
        this.canRecord.delay(POSITION_RECORD_DELTA_TIME_MS);

        OBJECT_MANAGER.heroes.forEach(h => {
            let posRecords = this.heroPastPositionMap.get(h.networkId);
            if (!posRecords) {
                posRecords = [{ timestamp: Date.now(), pos: { x: h.position.x, y: h.position.y } }];
                this.heroPastPositionMap.set(h.networkId, posRecords);
            } else {
                if (posRecords.length >= POSITION_COUNT_TO_KEEP) {
                    posRecords.shift();
                }
                posRecords.push({ timestamp: Date.now(), pos: { x: h.position.x, y: h.position.y } });
            }
        });
    }

    @Subscribe("EntityDespawnedEvent")
    onEntityDespawned(index: number) {
        this.heroPastPositionMap.delete(index);
    }
}

export const VELOCITY_UPDATER = new VelocityUpdater();
