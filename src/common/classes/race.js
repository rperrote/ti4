import Effect from './effect';

class Race {
    constructor (race) {
        this.id = race.id;
        this.name = race.name;
        this.effects = !race.effects || race.effects.map((effect) => {
          return new Effect(race.effect);
        });
        this.img = require(`../../assets/img/${race.img}`)
    }
}

export default Race;
