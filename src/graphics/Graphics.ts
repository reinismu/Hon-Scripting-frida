export class Graphics {
    private k2Module = Process.getModuleByName("libk2-x86_64.so");
    private draw2dPtr = this.k2Module.getExportByName("Draw2D").readPointer();
    // (CDraw2D *this, float a2, float a3, float a4, float a5, int a6, bool a7, unsigned int a8)
    private draw2dRect = new NativeFunction(this.k2Module.getExportByName("_ZN7CDraw2D4RectEffffibj"), "void", [
        "pointer",
        "float",
        "float",
        "float",
        "float",
        "int",
        "bool",
        "uint32"
    ]);

    public drawRect(x: number, y: number, width: number, height: number) {
        this.draw2dRect(this.draw2dPtr, x, y, width, height, 0, 0, 0xffffffff);
    }
}

export const GRAPHICS = new Graphics();