import React, { Component, PropTypes } from "react";
import * as actions from "../../actions/actions";
import { List, ListItem } from "material-ui/List";

export default class Chat extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    const { socket, user, games, dispatch } = this.props;
  }
  componentDidUpdate() {}
  render() {
    const { socket, user, games, dispatch } = this.props;
    return (
      <div style="">
        <div className="main">
          <List>
            {games.map((game, key) => {
              return (
                <ListItem
                  key={key}
                  onClick={event => {

                  }}
                  primaryText={game.name}
                />
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
