import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import Games from '../../components/games/games';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GamesContainers extends Component {
  constructor(props, context) {
    super(props, context);
    const { socket, dispatch, history } = this.props;

    socket.on("userJoined", res => {
      let game = res;
      game.currentPlayer = game.players.find(player => {
        return user.id == player.owner;
      });
      dispatch(actions.setCurrentGame(game));
      if (history.location.pathname.indexOf("game") == -1) {
        history.push("/game");
      }
    });

    socket.on('gameCreated',(res)=>{
      console.log(`Juego creado ${res}`)
      dispatch(actions.createGame(res));
    });
  }

  render() {
    return (
      <Games {...this.props} />
    );
  }
}

GamesContainers.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
      user: state.user,
      games: state.games,
  }
}
export default connect(mapStateToProps)(GamesContainers)
