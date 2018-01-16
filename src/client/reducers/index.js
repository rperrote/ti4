import { combineReducers } from 'redux'

import user from './user/user'
import game from './game/game'
import games from './games/games'

export default combineReducers({
  user,
  game,
  games
})
