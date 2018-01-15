import axios from "axios"

/* Used only by actions for sockets */
export const setGames = (res) => ({
	type: "GAMES",
	games: res
})

export const createGame = (res) => ({
	type: "CREATE_GAME",
	games: res
})

export const setUser = (res) => {
	return {
		type: "SET_USER",
		user: res
	}
}

export const clearAllItems = () => {
	return {
		type: "CLEAN_GAMES"
	}
}

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const fetchGames = (socket) => {
	return (dispatch) => {
		dispatch(clearAllItems())
		socket.on('listGames',(res)=>{
		   dispatch(setGames(res))
	   })
	}
}

export const claimUser = (socket,name) => {
	return () => {
		socket.emit('markItem',{name})
	}
}
