import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import io from 'socket.io-client';

import reducer from './reducers/index'
import User from "./containers/user/user";
import Games from "./containers/games/games";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const app = document.getElementById('app')

const socket = io.connect(`http://ti4-zionn.c9users.io:3000`)

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<User/>
		</MuiThemeProvider>
	</Provider>
	, app);
