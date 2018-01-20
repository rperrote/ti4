import Effect from './effect';

class Tech {
    constructor (name, effects:Array<Effect>, childs) {
        this.name = name;
        this.effects = effects;
        this.childs = childs;
    }
}

export default Tech;
