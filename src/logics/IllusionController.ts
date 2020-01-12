import { IUnitEntity } from "../honIdaStructs";
import { EventBus } from "eventbus-ts";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";

export class IllustionController {
    private mainHero: IUnitEntity;

    constructor(mainHero: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.mainHero = mainHero;
    }

    public control(target: IUnitEntity | null) {
        const illusions = this.getIllusions();

        illusions.forEach(i => {
            new Orbwalker(i).orbwalk(IGAME.mysteriousStruct.mousePosition);
        })

    }

    private getIllusions(): IUnitEntity[] {
        return OBJECT_MANAGER.heroes.filter(h => h.typeName == this.mainHero.typeName && h.isIllusion());
    }
}
