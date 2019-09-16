import { CInput } from "../honIdaStructs";
import { K2_MODULE } from "../game/Globals";
import "../extensions/NativePointerExtensions";

export class Input {
    private input = new CInput(K2_MODULE.getExportByName("g_pInput").readPointer());

    private ctrlDown = new NativeFunction(K2_MODULE.getExportByName("_ZN6CInput10IsCtrlDownEv"), "bool", ["pointer"]);
    private inputDown = new NativeFunction(K2_MODULE.getExportByName("_ZN6CInput12IsButtonDownE7EButton"), "bool", ["pointer", "char"]);
    private buttonToStringFunc = new NativeFunction(K2_MODULE.getExportByName("_ZN6CInput8ToStringE7EButton"), "pointer", ["pointer", "char"]);

    public isControlDown(): boolean {
        return this.ctrlDown(this.input.ptr) as boolean;
    }

    public isButtonDown(button: number): boolean {
        return this.inputDown(this.input.ptr, button) as boolean;
    }

    public isCharDown(char: string): boolean {
        return this.inputDown(this.input.ptr, char.charCodeAt(0)) as boolean;
    }

    public isSpaceDown(): boolean {
        return this.inputDown(this.input.ptr, 32) as boolean;
    }

    public buttonToString(button: number): string {
        const ptr = this.buttonToStringFunc(this.input.ptr, button) as NativePointer;
        console.log(`ptr: ${ptr}`);
        return ptr.readUtf8String() || "null";
    }

    public getCursorPos(): { x: number; y: number } {
        return { x: this.input.cursorPosX, y: this.input.cursorPosY };
    }
}

export const INPUT = new Input();