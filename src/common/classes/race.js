import Effect from './effect';

class Races {
    constructor (id, name, effects, img) {
        this.id = id;
        this.name = name;
        this.effects = effects.map((effect) => {
          return new Effect(effect);
        }) || [];
        this.img = require(`../../assets/img/${img}`)
    }
}

export default Races;
