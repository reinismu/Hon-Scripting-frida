export class Input {
    private k2Module = Process.getModuleByName("libk2-x86_64.so");
    private inputPtr = this.k2Module.getExportByName("g_pInput").readPointer();

    private inputDown = new NativeFunction(this.k2Module.getExportByName("_ZN6CInput10IsCtrlDownEv"), "bool", ["pointer"]);

    public isControlDown(): boolean {
        return this.inputDown(this.inputPtr) as boolean;
    }
}
