import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

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

  render() {
    const { socket, user, games, history, dispatch } = this.props;
    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        style={{width: '100%'}}
      >
        <BottomNavigationAction label="ME"/>
        <BottomNavigationAction label="PLAYERS" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="TECHNOLOGIES" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}
