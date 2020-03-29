import { Nitro } from "./scripts/Nitro";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";
import { Soulstealer } from "./scripts/Soulstealer";
import { Devourer } from "./scripts/Devourer";
import { Kinesis } from "./scripts/Kinesis";
import { Pyromancer } from "./scripts/Pyromancer";
import { Oogie } from "./scripts/Oogie";
import { Slither } from "./scripts/Slither";
import { Bushwack } from "./scripts/Bushwack";
import { WitchSlayer } from "./scripts/WitchSlayer";
import { Parallax } from "./scripts/Parallax";
import { MasterOfArms } from "./scripts/MasterOfArms";
import { Armadon } from "./scripts/Armadon";
import { Accursed } from "./scripts/Accursed";
import { Jeraziah } from "./scripts/Jeraziah";
import { Maliken } from "./scripts/Maliken";
import { SoulReaper } from "./scripts/SoulReaper";
import { Scout } from "./scripts/Scout";
import { Blacksmith } from "./scripts/Blacksmith";
import { Gauntlet } from "./scripts/Gauntlet";
import { Predator } from "./scripts/Predator";
import { Andromeda } from "./scripts/Andromeda";
import { Goldenveil } from "./scripts/Goldenveil";
import { Calamity } from "./scripts/Calamity";
import { Flux } from "./scripts/Flux";
import { Vindicator } from "./scripts/Vindicator";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();
// have to delay to get hero cache
setTimeout(() => {
    const testScript23 = new Devourer();

}, 200);


// Arti?
// Restart Orbwalking on stun

// const testScript = new Armadon();
// const testScript = new Andromeda();
// const testScript = new Bushwack();
// const testScript = new Gauntlet();
// const testScript = new Goldenveil();
    // const testScript23 = new Flux();
// const testScript = new Blacksmith();
// const testScript = new Jeraziah();
// const testScript = new Devourer();
// const testScript = new Gauntlet();
// const testScript = new MasterOfArms();
// const testScript = new Maliken();
// const testScript = new Predator();
// const testScript = new Slither();
// const testScript = new Oogie();
// const testScript = new Parallax();
// const testScript = new WitchSlayer();
// const testScript = new Scout();
// const testScript = new Kinesis();
// const testScript = new Pyromancer();
// const testScript = new SoulReaper();
// const testScript = new Thunderbringer();
// const testScript = new Nitro();
// const testScript = new Soulstealer(); // <-- pretty shit

// console.log(`watch: ${IGAME.mysteriousStruct.ptr.add(0x2b8)}`);

// add sand scepter