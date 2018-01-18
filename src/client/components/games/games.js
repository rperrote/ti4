import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import { List, ListItem } from "material-ui/List";
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button';

import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import AddIcon from 'material-ui-icons/Add';

import Immutable from "immutable";
import Moment from "moment";

let robotFontStyle = {
  fontFamily: "Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.870588)"
}

let socket
const mapStateToProps = (state = {}) => {
  // console.dir(state)
  return { ...state };
};

export class Games extends Component {
  static propTypes = {
    games: PropTypes.oneOfType([
      PropTypes.instanceOf(Array),
      PropTypes.instanceOf(Immutable.List)
    ]).isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    const { socket, user, dispatch, history } = this.props;

    socket.on('gameCreated',(res)=>{
      console.log("Responde pose");
      dispatch(actions.createGame(res));
    });

    socket.on('userJoined',(res)=>{
      console.log(res);
    });
  }

  setLocalPlayerAndCurrentGame(player, game) {
    console.log(player, game);
  }

  componentWillMount() {
    const { socket, user, games, dispatch, history } = this.props;
    if (!user || !user.name || user.name == "") {
      // history.push("/");
    }
  }
  componentDidUpdate() {}
  render() {
    const { socket, user, games, history, dispatch } = this.props;
    return (
      <div>
        <h1 style={robotFontStyle}>Ti4 - Helper</h1>
        <h3 style={robotFontStyle}>Games ({games.size})</h3>
        <Button
          secondary={true}

          onTouchTap={
            () => {
              socket.emit('createGame');
              console.log("Emito createGame");
            }
          }
        ><AddIcon /> </Button>
        <Divider/>
        <List>
          {games.map((game, key) => {
            return (
              <ListItem
                key={key}
                onClick={event => {
                  let alreadyIn = (game.players.find((player) => {
                    return user.id == player.owner;
                  }));
                  if(!alreadyIn){
                    socket.emit('joinGame',game.id);
                  }else{
                    this.setLocalPlayerAndCurrentGame(alreadyIn, player);
                  }
                }}
                primaryText={`Partida de ${user.name}`}
                rightIcon={<ArrowRight />}
              />
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Games);
