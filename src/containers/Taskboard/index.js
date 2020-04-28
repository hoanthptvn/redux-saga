import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import TaskList from './../../components/TaskList';
import { STATUSES } from './../../constants';
import TaskForm from './../../components/TaskForm';

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
];

class TaskBoard extends Component {

  state = {
    open: false
  };

  renderBoard() {
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>

        {
          STATUSES.map((status, index) => {
            const taskFiltered = ListTask.filter(task => task.status === status.value);
            return <TaskList key={index} status={status} index={index} tasks={taskFiltered} />;
          })
        }
      </Grid >
    );
    return xhtml;
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  openForm = () => {
    this.setState({
      open: true
    });
  }

  renderForm() {
    const { open } = this.state;
    let xhtml = null;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} >
        <Button variant="contained" color="primary" className={classes.button} onClick={this.openForm}>
          <AddIcon /> Thêm mới công việc
        </Button>

        {this.renderBoard()}
        {this.renderForm()}
      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);