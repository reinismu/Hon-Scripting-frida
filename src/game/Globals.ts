import { IGame } from "../honIdaStructs";
import { CLIENT_ENTITY_ARRAY_OFFSET, I_GAME_OFFSET } from "../offests";

export const SHARED_MODULE = Process.getModuleByName("libgame_shared-x86_64.so");
export const GAME_MODULE = Process.getModuleByName("cgame-x86_64.so");
export const K2_MODULE = Process.getModuleByName("libk2-x86_64.so");

const clientEntityArrayOffset = CLIENT_ENTITY_ARRAY_OFFSET;
export const CLIENT_ENTITY_ARRAY = GAME_MODULE.base.add(clientEntityArrayOffset);
export const CLIENT_ENTITY_ARRAY_MAX_SIZE = GAME_MODULE.base.add(clientEntityArrayOffset + 0x8);
export const CLIENT_ENTITY_ARRAY_SIZE = GAME_MODULE.base.add(clientEntityArrayOffset + 0xC);

export const IGAME = new IGame(GAME_MODULE.base.add(I_GAME_OFFSET).readPointer());