import Effect from './effect';
import Ship from './ship';
import Tech from './tech';

import techData from '../data/tech.json'
import shipData from '../data/ship.json'

class TechTree {
    constructor () {
        this.techs = [];
        this.ships = [];

        techData.forEach( techData => {
            var effects = [];
            techData.effects.forEach( effectData => {
                var effect = new Effect(effectData);
                effects.push(effect);
            });

            var tech = new Tech(techData);
            this.techs.push(tech);
        });

        shipData.forEach( shipData => {
            var ships = [];

            var tech = new Tech(shipData);
            this.techs.push(tech);
        });
    }
}

export default TechTree;
