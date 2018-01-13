import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../../components/user/user';

class UserContainer extends Component {
  render() {
    const { socket } = this.props;
    return (
      <User {...this.props} socket={socket} />
    );
  }
}
UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      user: state.user
  }
}
export default connect(mapStateToProps)(UserContainer)
