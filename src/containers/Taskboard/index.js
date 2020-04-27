import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import TaskList from './../../components/TaskList'

import { STATUSES } from './../../constants'

import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import Grid from '@material-ui/core/Grid';


const ListTask = [
  {
    id: 1,
    title: "Read book",
    description: "Ready material book",
    status: 0
  }, {
    id: 2,
    title: "Play football",
    description: "With my friend",
    status: 2
  }, {
    id: 3,
    title: "Play game",
    description: "Play game fifa",
    status: 1
  }
]

class TaskBoard extends Component {

  renderBoard() {
    let xhml = null;
    xhml = (
      <Grid container spacing={2}>

        {
          STATUSES.map((status, index) => {
            const taskFiltered = ListTask.filter(task => task.status === status.value);
            return <TaskList key={index} status={status} index={index} tasks={taskFiltered} />
          })
        }
      </Grid >
    )
    return xhml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} >
        <Button variant="contained" color="primary" className={classes.button}>
          <AddIcon /> Thêm mới công việc
        </Button>

        {this.renderBoard()
        }

      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);