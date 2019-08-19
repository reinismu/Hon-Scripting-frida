import { CInput } from "../honIdaStructs";
import { K2_MODULE } from "../game/Globals";

export class Input {
    private input = new CInput(K2_MODULE.getExportByName("g_pInput").readPointer());

    private inputDown = new NativeFunction(K2_MODULE.getExportByName("_ZN6CInput10IsCtrlDownEv"), "bool", ["pointer"]);

    public isControlDown(): boolean {
        return this.inputDown(this.input.ptr) as boolean;
    }

    public getCursorPos(): { x: number; y: number } {
        return { x: this.input.cursorPosX, y: this.input.cursorPosY };
    }
}

export const INPUT = new Input();