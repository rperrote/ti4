import axios from "axios"

export const AddItem = (data) => ({
	type: "ADD_ITEM",
	item: data.item,
	itemId:data.id,
	completed:data.completed
})

export const completeItem = (data) => ({
	type: "COMPLETED_ITEM",
	itemId: data.id,
	completed:data.completed
})

/* Used only by actions for sockets */
export const setGames = (res) => ({
	type: "GAMES",
	games: res
})

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

export const createGame = (socket,) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)		
	}	
}

export const markItemCompleteSocket = (socket,id,completedFlag) => {
	return (dispatch) => {
		let postData = {
				id:id,
				completed:completedFlag
		     }
		socket.emit('markItem',postData)
	}	
}
