import { withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import AddIcon from "@material-ui/icons/Add";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { STATUSES } from '../../constants';
import styles from './styles';

const ListTask = [
  {
    id: 1,
    title: "Read book",
    description: "Ready material book",
    status: 0,
  }, {
    id: 2,
    title: "Play football",
    description: "With my friend",
    status: 2,
  }, {
    id: 3,
    title: "Play game",
    description: "Play game fifa",
    status: 1,
  },
];

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  openForm = () => {
    this.setState({
      open: true,
    });
  }

  renderBoard() {
    let xhtml = null;
    xhtml = (
      <Grid
        container
        spacing={2}>
        {
          STATUSES.map((status, index) => {
            const taskFiltered = ListTask.filter((task) => task.status === status.value);
            return (
              <TaskList
                key={index}
                status={status}
                index={index}
                tasks={taskFiltered} />
            );
          })
        }
      </Grid>
    );
    return xhtml;
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
      <div
        className={classes.taskBoard}
      >
        <Button variant="contained" color="primary" className={classes.button} onClick={this.openForm}>
          <AddIcon /> Thêm mới công việc
        </Button>

        {this.renderBoard()}
        {this.renderForm()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(TaskBoard);