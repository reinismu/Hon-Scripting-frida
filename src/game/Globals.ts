import { IGame } from "../honIdaStructs";

export const SHARED_MODULE = Process.getModuleByName("libgame_shared-x86_64.so");
export const GAME_MODULE = Process.getModuleByName("cgame-x86_64.so");
export const K2_MODULE = Process.getModuleByName("libk2-x86_64.so");

const clientEntityArrayOffset = 0x7EBB58;
export const CLIENT_ENTITY_ARRAY = GAME_MODULE.base.add(clientEntityArrayOffset);
export const CLIENT_ENTITY_ARRAY_MAX_SIZE = GAME_MODULE.base.add(clientEntityArrayOffset + 0x8);
export const CLIENT_ENTITY_ARRAY_SIZE = GAME_MODULE.base.add(clientEntityArrayOffset + 0xC);

export const IGAME = new IGame(GAME_MODULE.base.add(0x804330).readPointer());