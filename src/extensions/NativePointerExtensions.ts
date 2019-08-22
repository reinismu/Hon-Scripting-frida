declare interface NativePointer {
    read32BitString(): string;
}

NativePointer.prototype.read32BitString = function(byteSize: number = 200): string {
    const self = this as NativePointer;
    const bytes = new Uint32Array(self.readByteArray(byteSize) || []);
    let str = "";
    for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 0) return str;
        str += String.fromCharCode(bytes[i]);
    }
    return str;
};
