
console.log("Hello from typescript. Process id: " + Process.id);

const baseModule = Process.enumerateModules()[0];

const sharedModule = Process.getModuleByName("libgame_shared-x86_64.so");
const gameModule = Process.getModuleByName("cgame-x86_64.so");

const onAction = sharedModule.getExportByName("_ZN11IUnitEntity6ActionE19EEntityActionScriptPS_P11IGameEntityP12CCombatEventP12CDamageEvent");
const zoomOut = sharedModule.getExportByName("_ZN7CPlayer7ZoomOutEv");

Interceptor.attach(zoomOut, {
    onEnter: function(args) {
      
      console.log(`arg 0 : ${args[0]}`);
      const player = new CPlayer(args[0]);
      console.log(`player: ${player.toJSON()}`);
    }
  });

// Process.enumerateModules().forEach(m => {
//   if (m.name.includes("game")) console.log(m.name + " -> " + m.base);
// });

// gameModule.enumerateExports().forEach(e => {
//   console.log("g: "+ e.name);
// });

class CObj {
  private ptr: NativePointer;

  constructor(ptr: NativePointer) {
    this.ptr = ptr;
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
    return this.align(0x1BC).readFloat();
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
