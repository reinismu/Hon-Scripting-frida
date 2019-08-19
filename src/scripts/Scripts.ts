import "../extensions/GameEntityExtensions";
import "../extensions/IEntityToolExtensions";

import { IGAME } from "../game/Globals";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Script {
    get player() {
        return IGAME.myPlayer;
    }

    get myHero() {
        return OBJECT_MANAGER.myHero;
    }
}
