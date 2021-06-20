import "../extensions/GameEntityExtensions";
import "../extensions/IEntityToolExtensions";
import "../extensions/CVec3Extensions";
import "../extensions/CSkeletonExtensions";

import { IGAME } from "../game/Globals";
import { OBJECT_MANAGER } from "../objects/ObjectManager";

export class Script {
    get player() {
        return IGAME.myPlayer;
    }

    get myHero() {
        return OBJECT_MANAGER.myHero;
    }

    get myBase() {
        return OBJECT_MANAGER.myBase;
    }
}
