import { Nitro } from "./scripts/Nitro";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";
import { Soulstealer } from "./scripts/Soulstealer";
import { monitor } from "./utils/MemoryAccessUtil";
import { IGAME } from "./game/Globals";
import { Devourer } from "./scripts/Devourer";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();
// have to delay to get hero cache
setTimeout(() => {
    const testScript = new Nitro();
}, 200);
// const testScript = new Devourer();
// const testScript = new Thunderbringer();
// const testScript = new Nitro();
// const testScript = new Soulstealer();

// console.log(`watch: ${IGAME.mysteriousStruct.ptr.add(0x2b8)}`);

