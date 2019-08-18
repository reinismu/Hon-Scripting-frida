import { CHostClient, IBuffer } from "../honIdaStructs";

class MyBuffer extends IBuffer {

    get myVtable(): NativePointer {
        return this.align(0x0).readPointer();
    }

    set myData(p: NativePointer) {
        this.align(0x8).writePointer(p);
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
}

export class Action {
    private k2Module = Process.getModuleByName("libk2-x86_64.so");
    private myBuffer: MyBuffer;
    private rawBuffer: NativePointer;
    private buffer = Buffer.alloc(2000);

    private bufferConstruct = new NativeFunction(this.k2Module.getExportByName("_ZN7IBufferC2Ev"), "void", ["pointer"]);
    private sendGameData = new NativeFunction(this.k2Module.getExportByName("_ZN11CHostClient12SendGameDataERK7IBufferb"), "pointer", [
        "pointer",
        "pointer",
        "bool"
    ]);
    private isLeaver = new NativeFunction(this.k2Module.getExportByName("_ZN11CHostClient8IsLeaverEv"), "bool", [
        "pointer"
    ]);

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

        console.log(`move buffer: ${new Uint8Array(this.buffer.slice(0,0x12))}`);
        console.log(`this.hostClient.ptr: ${this.hostClient.ptr}`);
        console.log(`this.myBuffer.ptr: ${this.myBuffer.ptr}`);

        this.rawBuffer.writeByteArray(this.buffer);

        this.sendGameData(this.hostClient.ptr, this.myBuffer.ptr, 0);
    }
}