import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Races from '../../common/classes/races';

export default class Races extends Component {
  state = {
    value: 0
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
      <div >
        <GridList cellHeight={200} >
          {Races.map(race => (
            <GridListTile key={race.id} onTouchTap={() => {
                socket.emit("chooseRace", { race: race.id });
              }}>
              <img src={`${race.id}.js`} alt={race.name} />
              <GridListTileBar
                title={race.name}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
