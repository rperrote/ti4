import axios from "axios"

/* Used only by actions for sockets */
export const setGames = (games) => ({
	type: "GAMES",
	games
})

export const createGame = (game) => ({
	type: "CREATE_GAME",
	game
})

export const setUser = (user) => {
	return {
		type: "SET_USER",
		user
	}
}

export const clearAllItems = () => {
	return {
		type: "CLEAN_GAMES"
	}
}

export const joinGame = (idGame, user) => {
	return {
		type: "JOIN_GAME",
		idGame,
		user
	}
}

export const setCurrentGame = (game) => {
	return {
		type: "SET_CURRENT_GAME",
		game
	}
}

export const setGamePlayers = (game) => {
	return {
		type: "SET_PLAYERS",
		game
	}
}

export const raceSelected = (data) => {
	return {
		type: "RACE_SELECTED",
		data
	}
}

export const mappingRace = (gameId) => {
	return {
		type: "MAPPING_RACE",
		gameId
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
