export function monitor(address: NativePointer, size: Number = 8) {
    MemoryAccessMonitor.enable({ base: address, size: size } as MemoryAccessRange, {
        onAccess: (details: MemoryAccessDetails) => {
            console.log(`${details.operation}: ${address} from ${details.from}`);
        }
    });
}

export function stopMonitor() {
    MemoryAccessMonitor.disable();
}
