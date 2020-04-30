import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import TaskItem from '../TaskItem';
import styles from './styles';

class TaskList extends React.PureComponent {
  render() {
    const { classes, status, tasks, index } = this.props;
    return (
      <Grid item md={4} xs={12} key={index}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return <TaskItem key={task.id} status={status} task={task} />;
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskList);
