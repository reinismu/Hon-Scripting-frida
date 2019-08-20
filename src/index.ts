import { TestScript } from "./scripts/TestScript";
import { initEventListener } from "./GameEventBus";
import { Thunderbringer } from "./scripts/Thunderbringer";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();

// const testScript = new Thunderbringer();
const testScript = new TestScript();

