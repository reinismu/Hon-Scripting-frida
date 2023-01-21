import { SHARED_MODULE, K2_MODULE } from "../game/Globals";
import { Vec2, Vec3 } from "../utils/Vector";

export class Graphics {
    private draw2dPtr = K2_MODULE.getExportByName("Draw2D").readPointer();
    private pVidPtr = K2_MODULE.getExportByName("pVid");
    private debugRendererPtr = SHARED_MODULE.getExportByName("g_DebugRenderer");
    // (CDraw2D *this, float a2, float a3, float a4, float a5, int a6, bool a7, unsigned int a8)
    private draw2dRect = new NativeFunction(K2_MODULE.getExportByName("_ZN7CDraw2D4RectEffffibj"), "void", [
        "pointer",
        "float",
        "float",
        "float",
        "float",
        "int",
        "bool",
        "uint32"
    ]);
    // (CDraw2D *this, float a2, float a3, float a4, float a5, int a6, bool a7, unsigned int a8)
    private draw2dLine = new NativeFunction(K2_MODULE.getExportByName("_ZN7CDraw2D4LineERK5CVec2IfES3_RK5CVec4IfES7_ib"), "void", [
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "int",
        "bool",
    ]);
    // void CDraw2D::Line(CVec2 *param_1,CVec2 *param_2,CVec4 *param_3,CVec4 *param_4,int param_5, bool param_6)
    private cVidAddLine = new NativeFunction(K2_MODULE.getExportByName("_ZN4CVid7AddLineERK5CVec3IfES3_RK5CVec4IfE"), "void", [
        "pointer",
        "pointer",
        "pointer",
        "pointer",
    ]);
    // void CDebugRenderer::AddLine(CDebugRenderer *this,CVec3 *param_1,CVec3 *param_2,CVec4 *param_3)
    private cDebugRendererAddLine = new NativeFunction(K2_MODULE.getExportByName("_ZN14CDebugRenderer7AddLineERK5CVec3IfES3_RK5CVec4IfE"), "void", [
        "pointer",
        "pointer",
        "pointer",
        "pointer",
    ]);

    public drawRect(x: number, y: number, width: number, height: number) {
        this.draw2dRect(this.draw2dPtr, x, y, width, height, 0, 0, 0xffffffff);
    }

    private vec3Mem1 = Memory.alloc(0x10);
    private vec3Mem2 = Memory.alloc(0x10);
    private vec4Mem = Memory.alloc(0x10);

    public drawLine(from: Vec3, to: Vec3) {

        // console.log(`cVidAddLine : ${this.cVidAddLine} pVidPtr ${this.pVidPtr}`)

        this.vec3Mem1.add(0x0).writeFloat(from.x);
        this.vec3Mem1.add(0x4).writeFloat(from.y);
        this.vec3Mem1.add(0x8).writeFloat(from.z);

        this.vec3Mem2.add(0x0).writeFloat(to.x);
        this.vec3Mem2.add(0x4).writeFloat(to.y);
        this.vec3Mem2.add(0x8).writeFloat(to.z);

        this.vec4Mem.add(0x0).writeFloat(1);
        this.vec4Mem.add(0x4).writeFloat(1);
        this.vec4Mem.add(0x8).writeFloat(1);
        this.vec4Mem.add(0xc).writeFloat(1);

        this.cVidAddLine(this.pVidPtr, this.vec3Mem1, this.vec3Mem2, this.vec4Mem);
    }

    private vec2Mem1 = Memory.alloc(0x10);
    private vec2Mem2 = Memory.alloc(0x10);
    private vec4Mem2d = Memory.alloc(0x10);

    public drawLine2d(from: Vec2, to: Vec2) {
        this.vec2Mem1.add(0x0).writeFloat(from.x);
        this.vec2Mem1.add(0x4).writeFloat(from.y);

        this.vec2Mem2.add(0x0).writeFloat(to.x);
        this.vec2Mem2.add(0x4).writeFloat(to.y);

        this.vec4Mem2d.add(0x0).writeFloat(0);
        this.vec4Mem2d.add(0x4).writeFloat(1);
        this.vec4Mem2d.add(0x8).writeFloat(0);
        this.vec4Mem2d.add(0xc).writeFloat(1);

        this.draw2dLine(this.pVidPtr, this.vec2Mem1, this.vec2Mem2, this.vec4Mem2d, this.vec4Mem2d, -1, 0);
    }
}

export const GRAPHICS = new Graphics();