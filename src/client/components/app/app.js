import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from "../../actions/actions";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import User from "../../containers/user/user";
import Games from "../../containers/games/games";

import io from 'socket.io-client';
const socket = io.connect(`http://ti4-zionn.c9users.io:8082`)

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends React.Component {
  render() {
        return (
            <div>
                <main>
                    <Switch>
                        <RouteWithProps exact path="/" component={User}/>
                        <RouteWithProps path="/games" component={Games}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

const RouteWithProps = ({ path, exact, component:Component}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => <Component {...props} socket={socket} />}
  />
);

function mapStateToProps(state) {
    return {};
}
export default withRouter(connect(mapStateToProps)(App));
