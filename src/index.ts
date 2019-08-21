import { TestScript } from "./scripts/TestScript";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";
import { monitor } from "./utils/MemoryAccessUtil";
import { IGAME } from "./game/Globals";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();

const testScript = new Thunderbringer();
// const testScript = new TestScript();

// console.log(`watch: ${IGAME.mysteriousStruct.ptr.add(0x2b8)}`);

