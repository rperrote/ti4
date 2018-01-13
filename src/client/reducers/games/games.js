import {List} from 'immutable';

const initialState = List([])


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GAMES':
        return List(action.games)
        
    case 'CREATE_GAME':
        return state.concat(action.game)
        
    case 'CLEAN_GAMES':
        return initialState
        
    default:
      return state
  }
}


export default reducer