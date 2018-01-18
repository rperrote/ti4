import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";

let robotFontStyle = {
  fontFamily: "Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.870588)"
};

export default class User extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {name: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    const { claimUser } = this.props;
    event.preventDefault();

    if(this.state.name === ""){
      alert("Item shouldn't be blank")
    }else{
      claimUser(this.state.name);
    }
  }

  render() {
    return (
      <div>
        <h1 style={robotFontStyle}>Ti4 - Helper</h1>
        <h3 style={robotFontStyle}>Login</h3>
        <Divider />
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="name"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
          />
          {" "}
          <Button
            raised
            color="primary"
            type="submit"
          >
            Ingresar
          </Button>
        </form>
      </div>
    );
  }
}
