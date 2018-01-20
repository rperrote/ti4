import Race from 'race';
import Data from '../data/races'

let Races = Data.map(race=>{

  return new Race(race);
})

export default Races;
