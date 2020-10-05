import { GAME_MODULE, K2_MODULE } from "./game/Globals";

const findOnMainLoop = () => {
    const onMainLoopCall = Memory.scanSync(K2_MODULE.base, K2_MODULE.size / 2, "E8 ?? ?? ?? ?? E9 ?? ?? ?? ?? EB 00 48 89 D5 48 89 C3")[0]
        .address; //  CHost::Execute contains main loop in K2
    const callOffset = onMainLoopCall.add(1).readS32() + 5; // 5 from next offset
    return onMainLoopCall.add(callOffset).sub(K2_MODULE.base);
};

const findSendClientSnapshot = () => {
    // Only method in cgame that calls CHostClient::SendClientSnapshot
    //  [actual address in first opcode] E8 ?? ?? ?? ?? 40 84 ED 74 16
    const sendClientSnapshotCall = Memory.scanSync(GAME_MODULE.base, GAME_MODULE.size / 2, "E8 ?? ?? ?? ?? 40 84 ED 74 16")[0].address;
    const callOffset = sendClientSnapshotCall.add(1).readS32() + 5;
    return sendClientSnapshotCall.add(callOffset).sub(GAME_MODULE.base);
};

const findClientEntityArrayOffset = () => {
    // Delete entity function
    //  [actual address in first opcode] E8 ?? ?? ?? ?? 48 83 C5 04 48 39 EB
    const deleteEntityCall = Memory.scanSync(GAME_MODULE.base, GAME_MODULE.size / 2, "E8 ?? ?? ?? ?? 48 83 C5 04 48 39 EB")[0].address;
    const callOffset = deleteEntityCall.add(1).readS32() + 5;
    const deleteEntityFunc = deleteEntityCall.add(callOffset);

    const usageInst = deleteEntityFunc.add(0x145);
    const clientEntityArrayOffset = usageInst.add(3).readS32();

    return usageInst.add(clientEntityArrayOffset).add(7).sub(GAME_MODULE.base);
};

const findIGame = () => {
    // sendCastSpellLocation function
    //  [actual address in first opcode] E9 ? ? ? ? 48 39 F5 
    const sendCastSpellLocationCall = Memory.scanSync(GAME_MODULE.base, GAME_MODULE.size / 2, "E9 ?? ?? ?? ?? 48 39 F5")[0].address;
    const callOffset = sendCastSpellLocationCall.add(1).readS32() + 5;
    const sendCastSpellLocationFunc = sendCastSpellLocationCall.add(callOffset);

    const usageInst = sendCastSpellLocationFunc.add(0x11);
    const iGameOffset = usageInst.add(3).readS32();

    return usageInst.add(iGameOffset).add(7).sub(GAME_MODULE.base);
};

export const updateOffsets = () => {
    console.log("onMainLoop", findOnMainLoop());
    console.log("sendClientSnapshot", findSendClientSnapshot());
    console.log("clientEntityArrayOffset", findClientEntityArrayOffset());
    console.log("iGame", findIGame());
};
