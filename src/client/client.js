import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import DevTools from "./components/devTools/devTools";

import App from "./components/app/app";

import reducer from "./reducers/index";

import { MuiThemeProvider, createMuiTheme,  } from 'material-ui/styles';

const theme = createMuiTheme();

const app = document.getElementById("app");

const store = createStore(reducer, applyMiddleware(thunk), DevTools.instrument());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <MuiThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <App />
        </Router>
      </MuiThemeProvider>
      <DevTools />
    </div>
  </Provider>,
  app
);
