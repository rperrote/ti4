import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Games from '../../components/games/games';

class GameListContainer extends Component {
  componentDidMount() {
    const { dispatch, user, games } = this.props;
    // if(!user.username) {
    //   dispatch(receiveAuth());
    // }
    dispatch(actions.fetchGames());
  }
  render() {
    const { socket } = this.props;
    return (
      <Games {...this.props} socket={socket} />
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
      user: state.user
  }
}
export default connect(mapStateToProps)(GameListContainer)
