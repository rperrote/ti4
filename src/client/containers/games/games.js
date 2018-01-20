import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import Games from '../../components/games/games';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Immutable from "immutable";

class GamesContainer extends Component {
  render() {
    return (
      <Games {...this.props} />
    );
  }
}
GamesContainer.propTypes = {
  user: PropTypes.object.isRequired,
  games: PropTypes.oneOfType([
      PropTypes.instanceOf(Array),
      PropTypes.instanceOf(Immutable.List)
    ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      user: state.user,
      games: state.games
  }
}
export default connect(mapStateToProps)(GamesContainer)
