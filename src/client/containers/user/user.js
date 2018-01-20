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

    socket.on("claimUser", res => {
      dispatch(actions.setUser(res));
      console.log("Responde pose");
      console.log(res);

      this.claimUser = this.claimUser.bind(this);
    });

    socket.on("listGames", res => {
      dispatch(actions.setGames(res));
      if (history.location.pathname.indexOf("games") == -1) {
        history.push("/games");
      }
      console.log("Responde pose");
      console.log(res);
    });
  }
// # Todo: Si esto lo paso al componente y lo invoco desde alla, las props no son las mismas.
  // claimUser(name){
  //   const { socket } = this.props;
  //   socket.emit("claimUser", { name });
  //   console.log("Emito claimUser");
  // }

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
