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

import Player from './player';

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
        {this.state.value === 0 && <Player dir="rtl" {...this.props}></Player>}
        {this.state.value === 1 && <TabContainer dir="ltr">Item Two</TabContainer>}
        {this.state.value === 2 && <TabContainer dir="ltr">Item Three</TabContainer>}
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
          style={{position: 'fixed', bottom: '0px', width: '95vw'}}
        >
          <BottomNavigationAction label="ME" />
          <BottomNavigationAction label="OTHERS"/>
          <BottomNavigationAction label="TECHS"/>
        </BottomNavigation>
      </div>
    );
  }
}
