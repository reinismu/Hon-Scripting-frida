import { CHostClient, IBuffer, IGameEntity } from "../honIdaStructs";
import { K2_MODULE, IGAME } from "../game/Globals";

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

    constructor(hostClient: CHostClient) {
        this.hostClient = hostClient;
        this.rawBuffer = Memory.alloc(0x2000);
        this.myBuffer = new MyBuffer(Memory.alloc(0x20));
        this.myBuffer.allocatedSize = 0;
        this.myBuffer.size = 0;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;
        this.bufferConstruct(this.myBuffer.ptr);
        this.myBuffer.myData = this.rawBuffer;
    }

    public move(x: number, y: number, flag: number = 0x2) {
        this.myBuffer.size = 0x12;
        this.myBuffer.allocatedSize = 0x12;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 0x1e;
        this.buffer[1] = flag & 255;
        this.buffer.writeFloatLE(x, 2);
        this.buffer.writeFloatLE(y, 6);
        this.buffer.write("\x00\x00\x00\x00\x00\xFF\xFF\x00", 10, 8, "ascii");
        
        this.rawBuffer.writeByteArray(this.buffer);

        this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
    }

    public castSpell(entity: IGameEntity, slot: number) {
        this.myBuffer.size = 0x6;
        this.myBuffer.allocatedSize = 0x6;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 27;
        this.buffer.writeUInt32LE(entity.networkId, 1);
        this.buffer[5] = slot;

        this.rawBuffer.writeByteArray(this.buffer);

        this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
    }

    public castSpellPosition(entity: IGameEntity, slot: number, x: number, y: number) {
        this.myBuffer.size = 14;
        this.myBuffer.allocatedSize = 14;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 28;
        this.buffer.writeUInt16LE(entity.networkId, 1);
        this.buffer[3] = slot;
        this.buffer[4] = 0; //Modifier if shift or ctr pressed
        this.buffer[5] = 0; //dunno
        this.buffer.writeFloatLE(x, 6);
        this.buffer.writeFloatLE(y, 10);

        this.rawBuffer.writeByteArray(this.buffer);

        this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
    }

    public castSpellEntity(entity: IGameEntity, slot: number, target: IGameEntity) {
        this.myBuffer.size = 8;
        this.myBuffer.allocatedSize = 8;
        this.myBuffer.currentOffset = 0;
        this.myBuffer.someFlag = 0;

        this.buffer[0] = 0x1d;
        this.buffer.writeUInt32LE(entity.networkId, 1);
        this.buffer[5] = slot;
        this.buffer[4] = 0; //Modifier if shift or ctr pressed
        this.buffer[5] = 0; //dunno
        this.buffer.writeUInt16LE(target.networkId, 6);

        this.rawBuffer.writeByteArray(this.buffer);

        this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
    }
}

export const ACTION = new Action(IGAME.hostClient);
