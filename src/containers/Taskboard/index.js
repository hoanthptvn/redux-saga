import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';

import { STATUSES } from './../../constants'

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from '@material-ui/core/Grid';


class TaskBoard extends Component {

  renderBoard() {
    let xhml = null;
    xhml = (
      <Grid container spacing={2}>

        {
          STATUSES.map((status, index) => {
            return (
              <Grid item md={4} xs={12} key={index}>
                {status.label}
              </Grid>
            )
          })
        }
      </Grid>
    )
    return xhml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button variant="contained" color="primary" className={classes.button}>
          <AddIcon /> Thêm mới công việc
        </Button>

        {this.renderBoard()}

      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);