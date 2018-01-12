import { combineReducers } from 'redux'

import user from './user/user'
import games from './games/games'

export default combineReducers({
  user,
  games
})