import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TaskItem from '../TaskItem';
import styles from './styles';

class TaskList extends Component {
  render() {
    const {
      classes,
      status,
      tasks,
      index,
      onClickEdit,
      onClickDelete,
    } = this.props;
    return (
      <Grid item md={4} xs={12} key={index}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                status={status}
                task={task}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={() => onClickDelete(task)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  status: PropTypes.object,
  index: PropTypes.number,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default withStyles(styles)(TaskList);
