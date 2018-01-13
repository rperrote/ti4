import React, { Component, PropTypes } from "react";
import * as actions from "../../actions/actions";
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

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
  }
  render() {
    const { socket, user, dispatch } = this.props;
    return (
			<div>
				<h1 style={robotFontStyle}>Ti4 - Helper</h1>
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
                :  dispatch(action.claimUser(socket,items.size,newItem))
					  }
					}
				/>
			</div>
		);
  }
}

export default connect(mapStateToProps)(User)
