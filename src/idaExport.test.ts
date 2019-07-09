import { decode } from "./idaExpoert";

test("Loading bin expoert test", () => {
    const k2 = decode("/home/detuks/Projects/hon/binaries/4.7.7.DUNNO/libk2-x86_64.BinExport");
    console.log(k2.callGraph);
})