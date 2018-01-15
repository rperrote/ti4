import React, { Component, PropTypes } from "react";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

import { List, ListItem } from "material-ui/List";
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'

import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import AddIcon from 'material-ui/svg-icons/content/add';

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
      <div>
        <h1 style={robotFontStyle}>Ti4 - Helper</h1>
        <h3 style={robotFontStyle}>Games ({games.size})</h3>
        <RaisedButton
          secondary={true}
          icon={<AddIcon />}
          onTouchTap={
            () => {
              socket.emit('createGame');
              console.log("Emito createGame");
            }
          }
        />
        <Divider/>
        <List>
          {games.map((game, key) => {
            return (
              <ListItem
                key={key}
                onClick={event => {
                  socket.emit('joinGame',game.id);
                  console.log("Emito joinGame");
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
