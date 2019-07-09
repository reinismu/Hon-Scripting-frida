import { inspect } from "util";

console.log("Hello from typescript. Process id: " + Process.id);

const baseModule = Process.enumerateModules()[0];

const sharedModule = Process.getModuleByName("libgame_shared-x86_64.so");
const gameModule = Process.getModuleByName("cgame-x86_64.so");
const k2Module = Process.getModuleByName("libk2-x86_64.so");

const onAction = sharedModule.getExportByName(
  "_ZN11IUnitEntity6ActionE19EEntityActionScriptPS_P11IGameEntityP12CCombatEventP12CDamageEvent"
);
const zoomOut = sharedModule.getExportByName("_ZN7CPlayer7ZoomOutEv");
const allocateNewEntity = sharedModule.getExportByName(
  "_ZN16CWorldEntityList10FreeEntityEj"
);
const getEntity = sharedModule.getExportByName(
  "_ZN16CWorldEntityList9GetEntityEjb"
);

const sendGameData = k2Module.getExportByName(
  "_ZN11CHostClient12SendGameDataERK7IBufferb"
);

Interceptor.attach(zoomOut, {
  onEnter: function(args) {
    console.log(`arg 0 : ${args[0]}`);
    const player = new CPlayer(args[0]);
    console.log(`keys: ${Object.keys(player)}`);
    console.log(`player: ${player.toJSON()}`);
    logCallTrace(this.context);
  }
});

// console.log(`sendPacket : ${sendPacket}`);

// Interceptor.attach(sendGameData, {
//   onEnter: function(args) {
//     if (args[1].toString() === "0x7ffeb07a9e10") return;
//     console.log(`CHostClient : ${args[0]}`);
//     const buffer = new IBuffer(args[1]);
//     console.log(`IBuffer : ${args[1]}`);
//     console.log(`IBuffer : ${buffer.toJSON()}`);
//     console.log(`flag : ${args[2]}`);
//   }
// });

// Process.enumerateModules().forEach(m => {
//   if (m.name.includes("game")) console.log(m.name + " -> " + m.base);
// });

// gameModule.enumerateExports().forEach(e => {
//   console.log("g: "+ e.name);
// });

function logCallTrace(context: CpuContext, backtracer: Backtracer = Backtracer.FUZZY) {
  const returnAdrs = Thread.backtrace(context, backtracer);
  returnAdrs.forEach(a => {
    const mod = Process.findModuleByAddress(a);
    if (mod) console.log(`${mod.name} + ${a.sub(mod.base)} `);
  });
}

class CObj {
  private ptr: NativePointer;

  constructor(ptr: NativePointer) {
    this.ptr = ptr;
  }

  get pointer(): number {
    return 123;
  }

  protected align(amount: number): NativePointer {
    return this.ptr.add(amount);
  }

  public toJSON(): string {
    let obj = Object.assign(this);
    let keys = Object.keys(this.constructor.prototype);
    obj.toJSON = undefined;
    return JSON.stringify(obj, keys);
  }
}

class IBuffer extends CObj {
  get vtable(): number {
    return this.align(0x0).readInt();
  }

  // get data(): ArrayBuffer | null {
  //   return this.align(0x4).readByteArray(this.allocatedSize);
  // }

  get allocatedSize(): number {
    return this.align(0x8).readInt();
  }

  get size(): number {
    return this.align(0xc).readInt();
  }

  get currentOffset(): number {
    return this.align(0x10).readInt();
  }

  get flag(): number {
    return this.align(0x14).readInt();
  }
}

class CPlayer extends CObj {
  get heroEntityId(): number {
    return this.align(0x80).readInt();
  }

  get currentCameraZoom(): number {
    return this.align(0x128).readFloat();
  }

  get nextCameraZoom(): number {
    return this.align(0x130).readFloat();
  }

  get minCameraZoom(): number {
    return this.align(0x1bc).readFloat();
  }
}

class Point extends CObj {
  public x(): number {
    return this.align(0).readInt();
  }

  public y(): number {
    return this.align(4).readInt();
  }
}
