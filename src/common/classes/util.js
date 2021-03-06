import TechTree from "./techTree";

export default class TechUtil {
  constructor(fileName) {
    this.techTree = new TechTree();
  }

  getAllTechsList() {
    return this.techTree.techs;
  }

  getNextTechs(techs) {
    var nextTechs = [];

    this.techTree.forEach(tech => {
      if (techs.indexOf(tech.id) === -1) {
        return;
      }

      tech.childs.forEach(childId => {
        if (nextTechs.indexOf(childId) === -1) {
          nextTechs.push(childId);
        }
      });
    });

    return nextTechs;
  }

  getShipsModified(techs) {
    var ships = this.techTree.ships;
    var duplicatedShips = ships.map(function(x) {
      return x;
    });

    techs.forEach(techId => {
      var tech = this.techTree.techs.find(function(tech) {
        return tech.id === techId;
      });

      tech.effects.forEach(effect => {
        duplicatedShips.forEach(ship => {
          if (ship.name === effect.who) {
            if ("atk" === effect.what) {
              ship.battle += effect.value;
            }
            if ("mov" === effect.what) {
              ship.mvmt += effect.value;
            }
            if ("cost" === effect.what) {
              ship.cost += effect.value;
            }
          }
        });
      });
    });

    return duplicatedShips;
  }
}
