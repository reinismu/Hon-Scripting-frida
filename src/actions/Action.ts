import { CHostClient, IBuffer, IGameEntity, IUnitEntity } from "../honIdaStructs";
import { K2_MODULE, IGAME } from "../game/Globals";
import { Vec2 } from "../utils/Vector";
import { EventBus, Subscribe } from "eventbus-ts";
import { DelayedCondition } from "../utils/DelayedCondition";

export class MyBuffer extends IBuffer {
    get myVtable(): NativePointer {
        return this.align(0x0).readPointer();
    }

    set myData(p: NativePointer) {
        this.align(0x8).writePointer(p);
    }

    get allocatedSize(): number {
        return this.align(0x10).readS32();
    }

    set allocatedSize(v: number) {
        this.align(0x10).writeS32(v);
    }

    set size(v: number) {
        this.align(0x14).writeS32(v);
    }

    set currentOffset(v: number) {
        this.align(0x18).writeS32(v);
    }

    set someFlag(v: number) {
        this.align(0x1c).writeS32(v);
    }

    get dataBuffer(): ArrayBuffer {
        return (
            this.align(0x8)
                .readPointer()
                .readByteArray(this.allocatedSize) || new ArrayBuffer(0)
        );
    }
}

const MAX_INDEX = 100;
const BUFFER_SIZE = 0x20;
const ACTION_DELAY_MS = 50;
class ActionQueue {
    private hostClient: CHostClient;

    private circularBuffer = Memory.alloc(BUFFER_SIZE * MAX_INDEX);
    private currentIndex = 0;
    private actionIndexQueue: number[] = [];
    private canSend = new DelayedCondition();

    private sendGameData = new NativeFunction(K2_MODULE.getExportByName("_ZN11CHostClient12SendGameDataERK7IBufferb"), "pointer", [
        "pointer",
        "pointer",
        "bool"
    ]);

    constructor(hostClient: CHostClient) {
        this.hostClient = hostClient;
        EventBus.getDefault().register(this);
    }

    public queue(buffer: MyBuffer) {
        if (this.actionIndexQueue.length >= MAX_INDEX) {
            console.log("Exceeded max actions!");
            return;
        }
        Memory.copy(this.circularBuffer.add(this.currentIndex * BUFFER_SIZE), buffer.ptr, BUFFER_SIZE);
        this.actionIndexQueue.push(this.currentIndex);
        this.currentIndex++;
        if (this.currentIndex >= MAX_INDEX) {
            this.currentIndex = 0;
        }
    }

    private send(index: number) {
        // console.log(`Send index ${index}`);
        this.sendGameData(this.hostClient.ptr, this.circularBuffer.add(index * BUFFER_SIZE), 0);
    }

    @Subscribe("MainLoopEvent")
    onMainLoop() {
        if (!this.canSend.isTrue()) {
            return;
        }

        const index = this.actionIndexQueue.shift();
        if (index === undefined) {
            return;
        }
        this.send(index);
        this.canSend.delay(ACTION_DELAY_MS);
    }
}

export class Action {
    private myBuffer: MyBuffer;
    private rawBuffer: NativePointer;
    private buffer = Buffer.alloc(2000);

    private bufferConstruct = new NativeFunction(K2_MODULE.getExportByName("_ZN7IBufferC2Ev"), "void", ["pointer"]);
    private sendGameData = new NativeFunction(
        K2_MODULE.getExportByName("_ZN11CHostClient12SendGameDataERK7IBufferb"),
        "pointer",
        ["pointer", "pointer", "bool"],
        {
            scheduling: "exclusive"
        }
    );
    private isLeaver = new NativeFunction(K2_MODULE.getExportByName("_ZN11CHostClient8IsLeaverEv"), "bool", ["pointer"]);

    private hostClient: CHostClient;
    private useQueue: boolean;
    private actionQueue: ActionQueue;

    constructor(hostClient: CHostClient, useQueue: boolean = true) {
        this.hostClient = hostClient;
        this.useQueue = useQueue;
        this.actionQueue = new ActionQueue(this.hostClient);

        this.rawBuffer = Memory.alloc(0x2000);
        this.myBuffer = new MyBuffer(Memory.alloc(BUFFER_SIZE));
        this.myBuffer.allocatedSize = 0;
        this.myBuffer.size = 0;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;
        this.bufferConstruct(this.myBuffer.ptr);
        this.myBuffer.myData = this.rawBuffer;
    }

    private toArray(buffer: Buffer): number[] {
        const array: number[] = [];
        const from = new Uint8Array(buffer);
        for (let i = 0; i < from.length; i++) {
            array.push(from[i]);
        }
        return array;
    }

    public send(insta: boolean = false) {
        if (!this.useQueue && !insta) {
            this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
        }
        this.actionQueue.queue(this.myBuffer);
    }

    public stop(entity: IUnitEntity | null = null) {
        this.myBuffer.size = 3;
        this.myBuffer.allocatedSize = 3;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 32;
        this.buffer.writeUInt16LE(entity ? entity.networkId : 0xffff, 1);

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send();
    }

    /**
     * @param pos
     * @param flag
     * @param entity allows to move specific entity in selection
     */
    public move(pos: Vec2, flag: number = 0x2, entity: IUnitEntity | null = null) {
        this.myBuffer.size = 0x12;
        this.myBuffer.allocatedSize = 0x12;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 0x1e;
        this.buffer[1] = flag & 255;
        this.buffer.writeFloatLE(pos.x, 2);
        this.buffer.writeFloatLE(pos.y, 6);
        this.buffer.write("\x00\x00\x00\x00\x00", 10, 5, "ascii");
        this.buffer.writeUInt16LE(entity ? entity.networkId : 0xffff, 15);
        this.buffer[17] = 0;
        // console.log(`this.buffer ${new Uint8Array(this.buffer.slice(0, 0x12))}`);
        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send();
    }

    public select(entity: IGameEntity) {
        this.myBuffer.size = 0x10;
        this.myBuffer.allocatedSize = 0x10;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 90;
        this.buffer[1] = 1;
        this.buffer.writeUInt16LE(entity.networkId, 2);
        this.buffer.writeUInt16LE(0xffff, 4);
        this.buffer.write("\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00", 6, 10, "ascii");

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send();
    }

    /**
     * @param target
     * @param flag
     * @param entity allows to move specific entity in selection
     */
    public attack(target: IGameEntity, flag: number = 0x8, entity: IUnitEntity | null = null) {
        this.myBuffer.size = 0x12;
        this.myBuffer.allocatedSize = 0x12;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 31;
        this.buffer[1] = flag & 255;
        this.buffer.writeUInt16LE(target.networkId, 2);
        this.buffer.write("\x00\x00\x00\x00\x00", 4, 5, "ascii");
        this.buffer.writeUInt16LE(entity ? entity.networkId : 0xffff, 9);
        this.buffer[11] = 0;

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send();
    }

    public castSpell(entity: IGameEntity, slot: number) {
        this.myBuffer.size = 0x6;
        this.myBuffer.allocatedSize = 0x6;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 27;
        this.buffer.writeUInt32LE(entity.networkId, 1);
        this.buffer[5] = slot;

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send(true);
    }

    public castSpell2(entity: IGameEntity, slot: number, queueCommand: boolean = false) {
        this.myBuffer.size = 0x6;
        this.myBuffer.allocatedSize = 0x6;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 27;
        this.buffer.writeUInt16LE(entity.networkId, 1);
        this.buffer[3] = slot;
        this.buffer[4] = queueCommand ? 1 : 0;
        this.buffer[5] = 0;

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send(true);
    }

    public castSpellPosition(entity: IGameEntity, slot: number, x: number, y: number, queueCommand: boolean = false) {
        this.myBuffer.size = 14;
        this.myBuffer.allocatedSize = 14;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 28;
        this.buffer.writeUInt16LE(entity.networkId, 1);
        this.buffer[3] = slot;
        this.buffer[4] = queueCommand ? 1 : 0;
        this.buffer[5] = 0; //dunno
        this.buffer.writeFloatLE(x, 6);
        this.buffer.writeFloatLE(y, 10);

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send(true);
    }

    public castSpellEntity(entity: IGameEntity, slot: number, target: IGameEntity) {
        this.myBuffer.size = 8;
        this.myBuffer.allocatedSize = 8;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 29;
        this.buffer.writeUInt32LE(entity.networkId, 1);
        this.buffer[3] = slot;
        this.buffer[4] = 0; //Modifier if shift or ctr pressed
        this.buffer[5] = 0; //dunno
        this.buffer.writeUInt16LE(target.networkId, 6);

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send(true);
    }

    public castSpellEntityRaw(entity: IGameEntity, slot: number, target: number) {
        this.myBuffer.size = 8;
        this.myBuffer.allocatedSize = 8;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 29;
        this.buffer.writeUInt32LE(entity.networkId, 1);
        this.buffer[3] = slot;
        this.buffer[4] = 0; //Modifier if shift or ctr pressed
        this.buffer[5] = 0; //dunno
        this.buffer.writeUInt16LE(target, 6);

        this.rawBuffer.writeByteArray(this.toArray(this.buffer));

        this.send(true);
    }
}

export const ACTION = new Action(IGAME.hostClient);
