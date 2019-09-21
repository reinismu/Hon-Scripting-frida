import { Nitro } from "./scripts/Nitro";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";
import { Soulstealer } from "./scripts/Soulstealer";
import { monitor } from "./utils/MemoryAccessUtil";
import { IGAME } from "./game/Globals";
import { Devourer } from "./scripts/Devourer";
import { Kinesis } from "./scripts/Kinesis";
import { Pyromancer } from "./scripts/Pyromancer";
import { Oogie } from "./scripts/Oogie";
import { Slither } from "./scripts/Slither";
import { Bushwack } from "./scripts/Bushwack";
import { WitchSlayer } from "./scripts/WitchSlayer";
import { Parallax } from "./scripts/Parallax";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();
// have to delay to get hero cache
setTimeout(() => {
    const testScript = new Oogie();
}, 200);
// const testScript = new Slither();
// const testScript = new Parallax();
// const testScript = new WitchSlayer();
// const testScript = new Bushwack();
// const testScript = new Kinesis();
// const testScript = new Pyromancer();
// const testScript = new Devourer();
// const testScript = new Thunderbringer();
// const testScript = new Nitro();
// const testScript = new Soulstealer(); // <-- pretty shit

// console.log(`watch: ${IGAME.mysteriousStruct.ptr.add(0x2b8)}`);

