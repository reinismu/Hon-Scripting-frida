import { IGame, CClientState } from "../honIdaStructs";

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
    private gameClient = Process.getModuleByName("cgame-x86_64.so");
    // Only method in cgame that calls CHostClient::SendClientSnapshot
    private sendClientSnapshot = new NativeFunction(this.gameClient.base.add(0x1fce60), "void", ["pointer", "pointer"], {
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
}
