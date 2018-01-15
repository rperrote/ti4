import React, { Component, PropTypes } from "react";
import * as actions from "../../actions/actions";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

let robotFontStyle = {
	fontFamily: "Roboto, sans-serif",
	color: "rgba(0, 0, 0, 0.870588)"
}

let socket
const mapStateToProps = (state = {}) => {
	// console.dir(state)
    return {...state};
};

export class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    const { socket, user, dispatch, history } = this.props;
    socket.on('claimUser',(res)=>{
      dispatch(actions.setUser(res));
      console.log("Responde pose");
      console.log(res);
    });

    socket.on('listGames',(res)=>{
      dispatch(actions.setGames(res));
      if(history.location.pathname.indexOf("games") == -1){
        history.push("/games");
      }
      console.log("Responde pose");
      console.log(res);
    });
  }
  render() {
    const { socket, user, dispatch } = this.props;
    return (
			<div>
				<h1 style={robotFontStyle}>Ti4 - Helper</h1>
        <h3 style={robotFontStyle}>Login</h3>
        <Divider/>
				<TextField
					hintText="Ingresa tu nombre"
      				floatingLabelText="Nombre"
					ref="name"
				/>
                {" "}
				<RaisedButton
					label="Login" primary={true}
					onTouchTap={
					  () => {
              const name = ReactDOM.findDOMNode(this.refs.name.input).value
              name === "" ?  alert("Item shouldn't be blank")
                :  socket.emit('claimUser',{name}); console.log("Emito claimUser");
					  }
					}
				/>
			</div>
		);
  }
}

export default connect(mapStateToProps)(User)
