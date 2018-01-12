import {List} from 'immutable';

const initialState = List([])


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GAMES':
        return List(action.games)
        
    case 'ENTER_GAME':
        return state.update(action.gameId,(value)=> {
            return {...value,current: true}
        })
        
    default:
      return state
  }
}


export default reducer