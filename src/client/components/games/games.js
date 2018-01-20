import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

import ArrowRight from "material-ui-icons/KeyboardArrowRight";
import AddIcon from "material-ui-icons/Add";

let robotFontStyle = {
  fontFamily: "Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.870588)"
};

export default class Games extends Component {
  constructor(props, context) {
    super(props, context);
  }

  setLocalPlayerAndCurrentGame(player, game) {
    const { dispatch, history } = this.props;
    game.localPlayer = player;
    dispatch(actions.setCurrentGame(game));
    history.push("/game");
  }

  componentWillMount() {
    const { socket, user, games, dispatch, history } = this.props;
    if (!user || !user.name || user.name == "") {
      history.push("/");
    }
  }
  componentDidUpdate() {}
  render() {
    const { socket, user, games, history, dispatch } = this.props;
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h1 style={robotFontStyle}>Ti4 - Helper</h1>
          </Grid>
          <Grid item xs={8}>
            <h3 style={robotFontStyle}>Games ({games.length})</h3>
          </Grid>
          <Grid item xs={4}>
            <Button
              raised
              color="contrast"
              type="submit"
              onTouchTap={() => {
                socket.emit("createGame");
                console.log("Emito createGame");
              }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {games.map((game, key) => {
            return (
              <ListItem
                key={key}
                onClick={event => {
                  let alreadyIn = game.players.find(player => {
                    return user.id == player.owner;
                  });
                  if (!alreadyIn) {
                    socket.emit("joinGame", game.id);
                  } else {
                    this.setLocalPlayerAndCurrentGame(alreadyIn, game);
                  }
                }}
                button
              >
                <ListItemText primary={`Partida de ${game.players.find((player) => {
                  return player.owner == game.owner;
                }).name}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
