import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GameListContainer extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    if(!user.username) {
      dispatch(receiveAuth());
    }
    dispatch(actions.fetchGames());
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}
GameListContainer.propTypes = {
  games: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      games: state.games,
      user: state.auth.user
  }
}
export default connect(mapStateToProps)(GameListContainer)
