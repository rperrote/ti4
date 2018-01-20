import Effect from './effect';

class Tech {
    constructor (name, effects:Array<Effect>) {
        this.name = name;
        this.effects = effects;
    }
}

export default Tech;
