import {List} from 'immutable';

let id = 0;
const initialState = {}


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
        return action.game

    default:
      return state
  }
}


export default reducer
