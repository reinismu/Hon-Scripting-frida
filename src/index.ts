import { Nitro } from "./scripts/Nitro";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";
import { monitor } from "./utils/MemoryAccessUtil";
import { IGAME } from "./game/Globals";
import { Devourer } from "./scripts/Devourer";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();

const testScript = new Devourer();
// const testScript = new Nitro();

// console.log(`watch: ${IGAME.mysteriousStruct.ptr.add(0x2b8)}`);

