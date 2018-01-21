import { List } from "immutable";
import Races from "../../../common/classes/races";

const initialState = List([]);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GAMES":
      return [...action.games];

    case "CLEAN_GAMES":
      return initialState;

    case "CREATE_GAME":
      if (
        state.find(game => {
          return game.id == action.game.id;
        })
      ) {
        return [...state];
      }
      return [...state, action.game];

    case "SET_PLAYERS":
      return state.map(game => {
        if (game.id == action.game.id) {
          game.palyers = action.game.players;
        }
        return game;
      });

    case "MAPPING_RACE":
      return state.map(game => {
        if (game.id == action.gameId) {
          game.players = game.players.map(player => {
            if (player.race != null && Number.isInteger(player.race)) {
              player.race = Races.find(race => {
                return race.id == player.race;
              });
            }
            return player;
          });
        }
        return game;
      });

    default:
      return state;
  }
};

export default reducer;
