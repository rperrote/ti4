import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers/index'
import Games from "./containers/games/games";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const app = document.getElementById('app')

const socket = io.connect(`http://localhost:${process.env.PORT || 3000}`)

const store = createStore(reducer, applyMiddleware(thunk))

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router>
        <Route path="/" component={Games} socket={socket}>
        </Route>
      </Router>
		</MuiThemeProvider>
	</Provider>
	, app);
