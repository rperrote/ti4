import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../actions/actions";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    height: "100vh",
    padding: "10px"
  }
});

class Player extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {}

  render() {
    const { socket, game, classes} = this.props;
    return (
      <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="none" >UNIT</TableCell>
                <TableCell padding="none" >COST</TableCell>
                <TableCell padding="none" >BATTLE</TableCell>
                <TableCell padding="none" >MVMT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell padding="none" >"PDS"</TableCell>
                <TableCell padding="none" >1</TableCell>
                <TableCell padding="none" >6</TableCell>
                <TableCell padding="none" >-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    );
  }
}

export default withStyles(styles)(Player);
