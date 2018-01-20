import {List} from 'immutable';

const initialState = List([])


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GAMES':
        return [...action.games]

    case 'CLEAN_GAMES':
        return initialState

    case 'CREATE_GAME':
        if(state.find((game) => {
          return game.id == action.game.id;
        })){
          return [...state]
        }
        return [...state, action.game]



    default:
      return state
  }
}


export default reducer
