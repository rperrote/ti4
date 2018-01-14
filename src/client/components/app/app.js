import React, { Component, PropTypes } from "react";
import * as actions from "../../actions/actions";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import User from "../../components/user/user";
import Games from "../../components/games/games";

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
                        <Route
                            exact
                            path="/"
                            component={UserContainer}
                        />
                        <Route
                            path="/games"
                            component={GamesContainer}
                        />
                    </Switch>
                </main>
            </div>
        );
    }
}

const UserContainer = props => {
    return (
        <User {...props} socket={socket}/>
    );
};

const GamesContainer = props => {
    return (
        <Games {...props} socket={socket}/>
    );
};

function mapStateToProps(state) {
    return {};
}
export default withRouter(connect(mapStateToProps)(App));
