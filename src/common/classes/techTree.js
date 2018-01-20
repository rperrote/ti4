import Effect from './effect';
import Ship from './ship';
import Tech from './tech';

class TechTree {
    constructor (fileName) {
        this.techs = [];
        this.ships = [];
        
        var techTreeData = JSON.parse(fileName);
        
        techTreeData.techs.forEach( techData => {
            var effects = [];
            techData.effects.forEach( effectData => {
                var effect = new Effect(effectData.who, effectData.what, effectData.value);
                effects.push(effect);
            });
            
            var tech = new Tech(techData.nombre, effects, techData.childs);
            this.techs.push(tech);
        });
        
        techTreeData.ships.forEach( shipData => {
            var ships = [];
            
            var tech = new Tech(shipData.nombre, shipData.cost, shipData.atk, shipData.mov, "");
            this.techs.push(tech);
        });
    }
}

export default TechTree;