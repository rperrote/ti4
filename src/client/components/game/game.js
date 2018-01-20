import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';

import Typography from 'material-ui/Typography';

import ArrowRight from "material-ui-icons/KeyboardArrowRight";
import AddIcon from "material-ui-icons/Add";

let robotFontStyle = {
  fontFamily: "Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.870588)"
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default class Game extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    const { socket, user, games, dispatch, history } = this.props;
    if (!user || !user.name || user.name == "") {
      history.push("/");
    }
  }
  componentDidUpdate() {}
  render() {
    const { socket, user, games, history, dispatch } = this.props;
    return (
      <Paper style={{ width: '100%' }}>
        {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
        {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
        {this.state.value === 2 && <TabContainer>Item Three</TabContainer>}
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="accent"
          textColor="accent"
        >
          <Tab label="ME" />
          <Tab label="PLAYERS" />
          <Tab label="TECHNOLOGIES" />
        </Tabs>
      </Paper>
    );
  }
}
