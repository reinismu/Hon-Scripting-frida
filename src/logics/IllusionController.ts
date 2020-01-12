import { IUnitEntity } from "../honIdaStructs";
import { EventBus } from "eventbus-ts";
import { OBJECT_MANAGER } from "../objects/ObjectManager";
import { Orbwalker } from "./Orbwalker";
import { IGAME } from "../game/Globals";

export class IllustionController {
    private mainHero: IUnitEntity;

    private illusionOrbwalkers: Map<number, Orbwalker> = new Map();

    constructor(mainHero: IUnitEntity) {
        EventBus.getDefault().register(this);
        this.mainHero = mainHero;
    }

    public refreshHero(mainHero: IUnitEntity) {
        this.mainHero = mainHero;
    }

    public control(target: IUnitEntity | null) {
        const illusions = this.getIllusions();

        illusions.forEach(ilus => {
            let orbwalker = this.illusionOrbwalkers.get(ilus.networkId);
            if(!orbwalker) {
                orbwalker = new Orbwalker(ilus);
                this.illusionOrbwalkers.set(ilus.networkId, orbwalker);
            }
            orbwalker.refreshWalker(ilus);
            orbwalker.orbwalk(IGAME.mysteriousStruct.mousePosition);
        });

        // Clean up
        const netIds = illusions.map(i => i.networkId);
        const allIds = Array.from(this.illusionOrbwalkers.keys());
        allIds.filter(id => !netIds.includes(id)).forEach(id => {
            this.illusionOrbwalkers.delete(id);
        })
    }

    private getIllusions(): IUnitEntity[] {
        return OBJECT_MANAGER.heroes.filter(h => h.typeName == this.mainHero.typeName && h.isIllusion());
    }
}
