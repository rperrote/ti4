import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";

import Game from "../../components/game/game";
import Races from "../../components/game/races";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RacesData from "../../../common/classes/races";

let socket;

class GameContainer extends Component {
  constructor(props, context) {
    super(props, context);
    const { socket, user, game, history, dispatch } = this.props;

    if (!user || !user.name || user.name == "") {
      history.push("/");
    }

    socket.on("userRace", res => {
      let race = RacesData.find(race => {
        return race.id == res.raceId;
      });
      dispatch(actions.raceSelected({ race, gameId, userId }));
    });
  }

  componentWillMount() {
    const { game, localPlayer, dispatch } = this.props;
    if (
      localPlayer &&
      localPlayer.race != null &&
      Number.isInteger(localPlayer.race)
    ) {
      dispatch(actions.mappingRace(game.id));
    }
  }

  render() {
    const { localPlayer } = this.props;
    if (localPlayer) {
      return (
        <div>
          {localPlayer.race == null && <Races {...this.props} />}
          {localPlayer.race != null && <Game {...this.props} />}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

GameContainer.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  if (state.game) {
    return {
      user: state.user,
      game: state.games.find(game => {
        return game.id == state.game;
      }),
      localPlayer: state.games
        .find(game => {
          return game.id == state.game;
        })
        .players.find(player => {
          return player.owner == state.user.id;
        })
    };
  }else{
    return {};
  }
}
export default connect(mapStateToProps)(GameContainer);
