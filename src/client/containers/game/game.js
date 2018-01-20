import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import Game from '../../components/game/game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let socket;

class GameContainer extends Component {
  constructor(props, context) {
    super(props, context);
    const { socket, dispatch, history } = this.props;

    // socket.on("listGames", res => {

    // });
  }

  render() {
    return (
      <Game {...this.props} />
    );
  }
}

GameContainer.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      user: state.user,
      game: state.game
  }
}
export default connect(mapStateToProps)(GameContainer)
