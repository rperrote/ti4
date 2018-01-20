import Effect from './effect';

class Races {
    constructor (name, effects:Array<Effect>) {
        this.name = name;
        this.effects = effects;
    }
}

export default Races;
