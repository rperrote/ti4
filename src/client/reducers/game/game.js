import {List} from 'immutable';

const initialState = null

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
        return action.game.id

    default:
      return state
  }
}

export default reducer
