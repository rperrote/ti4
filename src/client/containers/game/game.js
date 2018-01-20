import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import User from '../../components/user/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let socket;

class UserContainer extends Component {
  constructor(props, context) {
    super(props, context);
    const { socket, dispatch, history } = this.props;

    // socket.on("listGames", res => {

    // });
  }

  render() {
    return (
      <User {...this.props} />
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      user: state.user,
  }
}
export default connect(mapStateToProps)(UserContainer)
