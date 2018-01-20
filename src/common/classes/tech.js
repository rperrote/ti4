import Effect from './effect';

class Tech {
    constructor (name, effects, childs) {
        this.name = name;
        this.effects = effects.map(effect => {
          return new Effect(effect);
        });
        this.childs = childs;
    }
}

export default Tech;
