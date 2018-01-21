import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import RacesData from '../../../common/classes/races';

export default class Races extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {

  }

  render() {
    const { socket, game } = this.props;
    return (
      <div >
        <GridList cellHeight={200} >
          {RacesData.map(race => (
            <GridListTile key={race.id} onTouchTap={() => {
                socket.emit("chooseRace", { gameId:game.id, raceId: race.id });
              }}>
              <img src={`${race.img}`} alt={race.name} />
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
