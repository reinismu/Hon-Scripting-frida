import { TestScript } from "./scripts/TestScript";
import { initEventListener } from "./GameEventBus";

console.log("Hello from typescript. Process id: " + Process.id);

initEventListener();

const testScript = new TestScript();

