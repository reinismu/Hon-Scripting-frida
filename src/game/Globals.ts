import { IGame } from "../honIdaStructs";

export const SHARED_MODULE = Process.getModuleByName("libgame_shared-x86_64.so");
export const GAME_MODULE = Process.getModuleByName("cgame-x86_64.so");
export const K2_MODULE = Process.getModuleByName("libk2-x86_64.so");

export const CLIENT_ENTITY_ARRAY = GAME_MODULE.base.add(0x7ebb48);
export const CLIENT_ENTITY_ARRAY_SIZE = GAME_MODULE.base.add(0x7ebb54);
export const CLIENT_ENTITY_ARRAY_MAX_SIZE = GAME_MODULE.base.add(0x7ebb50);

export const IGAME = new IGame(GAME_MODULE.base.add(0x804320).readPointer());