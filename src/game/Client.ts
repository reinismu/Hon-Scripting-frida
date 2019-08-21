import { IGame, CClientState } from "../honIdaStructs";
import { GAME_MODULE, IGAME } from "./Globals";
import { Vec3 } from "../utils/Vec3";

class WritableClientState extends CClientState {
    // mousePosX -> type: float
    set mousePosX(v: number) {
        this.align(0x40).writeFloat(v);
    }

    // mousePosY -> type: float
    set mousePosY(v: number) {
        this.align(0x44).writeFloat(v);
    }

    // mousePosZ -> type: float
    set mousePosZ(v: number) {
        this.align(0x48).writeFloat(v);
    }
}

export class Client {
    iGame: IGame;
    // Only method in cgame that calls CHostClient::SendClientSnapshot
    private sendClientSnapshot = new NativeFunction(GAME_MODULE.base.add(0x1fce60), "void", ["pointer", "pointer"], {
        scheduling: "exclusive"
    });

    constructor(iGame: IGame) {
        this.iGame = iGame;
    }

    public sendFakeMousePosToServer(x: number, y: number, z: number) {
        const state = new WritableClientState(this.iGame.clientState1.ptr);
        state.mousePosX = x;
        state.mousePosY = y;
        state.mousePosZ = z;

        this.sendClientSnapshot(this.iGame.ptr, new NativePointer(0));
    }

    private worldToScreenMethod = new NativeFunction(
        GAME_MODULE.getExportByName("_ZNK7CCamera13WorldToScreenERK5CVec3IfER5CVec2IfE"),
        "bool",
        ["pointer", "pointer", "pointer"]
    );
    private vec3Mem = Memory.alloc(0x10);
    private vec2Mem = Memory.alloc(0x8);

    public worldToScreen(worldVec: Vec3): { x: number; y: number } {
        this.vec3Mem.add(0x0).writeFloat(worldVec.x);
        this.vec3Mem.add(0x4).writeFloat(worldVec.y);
        this.vec3Mem.add(0x8).writeFloat(worldVec.z);

        this.worldToScreenMethod(this.iGame.camera.ptr, this.vec3Mem, this.vec2Mem);

        return { x: this.vec2Mem.readFloat(), y: this.vec2Mem.add(0x4).readFloat() };
    }
}

export const CLIENT = new Client(IGAME);
