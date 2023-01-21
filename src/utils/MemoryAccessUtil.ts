export const toReadableAddress = (addr: NativePointer) => {
    const mod = Process.findModuleByAddress(addr);
    if (!mod) {
        return `${addr}`
    }
    const modAddress = addr.sub(mod.base);
    return `${mod.name} + ${modAddress}`;
};

export function monitor(ranges: MemoryAccessRange[]) {
    MemoryAccessMonitor.enable(ranges, {
        onAccess: (details: MemoryAccessDetails) => {
            console.log(`${details.operation}: ${toReadableAddress(details.address)} from ${toReadableAddress(details.from)}`);
        },
    });
}

export function stopMonitor() {
    MemoryAccessMonitor.disable();
}
