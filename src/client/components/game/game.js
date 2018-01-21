import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import SwipeableViews from 'react-swipeable-views';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from "material-ui-icons/Restore";
import FavoriteIcon from "material-ui-icons/Favorite";
import LocationOnIcon from "material-ui-icons/LocationOn";
import Paper from "material-ui/Paper";
import Typography from 'material-ui/Typography';

let robotFontStyle = {
  fontFamily: "Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.870588)"
};

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

export default class Game extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
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
      <div>
        <SwipeableViews
          axis="x-reverse"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir="rtl">Item One</TabContainer>
          <TabContainer dir="rtl">Item Two</TabContainer>
          <TabContainer dir="rtl">Item Three</TabContainer>
        </SwipeableViews>
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
          style={{ width: "99%", position: "absolute", bottom: 0 }}
        >
          <BottomNavigationAction label="ME" />
          <BottomNavigationAction label="PLAYERS"/>
          <BottomNavigationAction label="TECHNOLOGIES"/>
        </BottomNavigation>
      </div>
    );
  }
}
