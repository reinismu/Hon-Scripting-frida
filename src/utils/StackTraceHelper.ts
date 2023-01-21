// import { IdaHelper } from "../idaExport";

// const idaHelper = new IdaHelper();
// idaHelper.addIdaInfo("libk2-x86_64.so", "/home/detuks/Projects/hon/hon-frida/ida_data/libk2-x86_64.json");
// idaHelper.addIdaInfo("cgame-x86_64.so", "/home/detuks/Projects/hon/hon-frida/ida_data/cgame-x86_64.json");
// idaHelper.addIdaInfo("libgame_shared-x86_64.so", "/home/detuks/Projects/hon/hon-frida/ida_data/libgame_shared-x86_64.json");

export function logCallTrace(context: CpuContext, backtracer: Backtracer = Backtracer.FUZZY) {
    const returnAdrs = Thread.backtrace(context, backtracer);
    returnAdrs.forEach(a => {
        const mod = Process.findModuleByAddress(a);
        if (!mod) return;
        const modAddress = a.sub(mod.base);
        console.log(`${mod.name} + ${modAddress} `);
        // const func = undefined; //idaHelper.getFunctionAt(mod.name, modAddress);
        // if (func) {
        //     console.log(
        //         `${mod.name} + ${func.demangledName ? `${func.demangledName} + ${modAddress.sub(func.address as number)}` : modAddress} `
        //     );
        // } else {
        // }
    });
}