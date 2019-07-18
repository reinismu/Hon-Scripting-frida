# Hon-frida
Tool to easily interact with game

## Setup

### Ida function names (Used for better stacktrace logging)
* Get **IDA BinExport** (https://github.com/google/binexport)
* Export needed files based on **idaExpoertGetNeeded.ts** file
* run `npm run export-funcs`

### Ida structures to classes
* Export header file in IDA `File -> Produce file -> Create C header file`
* Edit ***scripts/header-parse.py* to use the new file
* Requires `Clang` and `Python`
* Run `npm run generate-ida-structs`


## Version update

### Symbol migration

#### Pre steps
* Check if libs were actually updated `md5sum cgame-x86_64.so`
* If not then copy over ida databases

#### Migration
* alternative https://www.zynamics.com/bindiff.html
* Use https://github.com/joxeankoret/diaphora
* Tips https://github.com/joxeankoret/diaphora/blob/master/doc/diaphora_help.pdf
* Could change haxrays max function size to lower than 256



-> size 0x3D8
#pragma pack(push, 1)
struct CWorld
{
    __int64 field_0;
    _BYTE gap_8[8];
    char field_10;
    _BYTE gap_11[7];
    _QWORD field_18;
    __int64 field_20;
    _QWORD field_28;
    _QWORD field_30;
    __int64 field_38;
    _QWORD field_40;
    __int64 field_48;
    _BYTE gap_50[16];
    __int64 field_60;
    _BYTE gap_68[8];
    __int64 field_70;
    _BYTE gap_78[12];
    float field_84;
    int field_88;
    int field_8C;
    int field_90;
    __int64 field_94;
    int field_9C;
    int field_A0;
    __int64 field_A4;
    int field_AC;
    int field_B0;
    __int64 field_B4;
    float field_BC;
    int field_C0;
    _BYTE gap_C4[4];
    __int64 field_C8;
    _BYTE gap_D0[8];
    __int64 field_D8;
    int field_E0;
    _BYTE gap_E4[4];
    __int64 field_E8;
    _BYTE gap_F0[4];
    int field_F4;
    __int64 field_F8;
    float field_100;
    _BYTE gap_104[2];
    __int64 field_106;
    _BYTE gap_10E[2];
    float field_110;
    _BYTE gap_114[2];
    char field_116;
    _BYTE gap_117;
    __int64 field_118;
    _QWORD field_120;
    __int64 field_128;
    _BYTE gap_130[8];
    __int64 field_138;
    _BYTE gap_140[8];
    __int64 field_148;
    _BYTE gap_150[8];
    int field_158;
    _BYTE gap_15C[4];
    _QWORD field_160;
    _QWORD field_168;
    _QWORD field_170;
    _QWORD field_178;
    _QWORD field_180;
    _QWORD field_188;
    _QWORD field_190;
    _QWORD field_198;
    _QWORD field_1A0;
    _QWORD field_1A8;
    _QWORD field_1B0;
    _QWORD field_1B8;
    _QWORD field_1C0;
    _QWORD field_1C8;
    _QWORD field_1D0;
    _QWORD field_1D8;
    _QWORD field_1E0;
    _QWORD field_1E8;
    _QWORD field_1F0;
    _BYTE gap_1F8[16];
    _QWORD field_208;
    _QWORD field_210;
    _QWORD field_218;
    _QWORD field_220;
    _QWORD field_228;
    _QWORD field_230;
    _QWORD field_238;
    _QWORD field_240;
    _BYTE gap_248[8];
    _QWORD field_250;
    _QWORD field_258;
    _QWORD field_260;
    _QWORD field_268;
    _BYTE gap_270[40];
    __int64 field_298;
    __int64 field_2A0;
    __int64 field_2A8;
    __int64 field_2B0;
    __int64 field_2B8;
    __int64 field_2C0;
    __int64 field_2C8;
    __int64 field_2D0;
    __int64 field_2D8;
    __int64 field_2E0;
    __int64 field_2E8;
    __int64 field_2F0;
    __int64 field_2F8;
    __int64 field_300;
    __int64 field_308;
    __int64 field_310;
    __int64 field_318;
    _BYTE gap_320[16];
    __int64 field_330;
    __int64 field_338;
    __int64 field_340;
    __int64 field_348;
    __int64 field_350;
    __int64 field_358;
    __int64 field_360;
    CVertexCameraHeightMap *field_368;
    __int64 field_370;
    __int64 field_378;
    __int64 field_380;
    __int64 field_388;
    __int64 field_390;
    __int64 field_398;
    __int64 field_3A0;
    __int64 field_3A8;
    int field_3B0;
    _BYTE gap_3B4[4];
    char *field_3B8;
    _QWORD field_3C0;
    _BYTE gap_3C8[8];
    __int64 field_3D0;
};



#pragma pack(push, 1)
struct CWorldTree
{
    _QWORD field_0;
    _QWORD field_8;
    _QWORD field_10;
    _BYTE gap_18[40];
    _QWORD field_40;
    __int64 field_48;
    _QWORD field_50;
    _BYTE gap_58[56];
    int field_90;
    int field_94;
    _QWORD field_98;
};


#pragma pack(push, 1)
struct NeededWorld
{
    _QWORD field_0;
    _BYTE gap_8[34664];
    _QWORD worldPtr;
};
