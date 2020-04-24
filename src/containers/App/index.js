import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { withStyles } from '@material-ui/core';


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <h1>Hello redux-saga</h1>
        <Button variant="contained" color="primary">Material ui button</Button>
        <div className={classes.box}>
          <div className={classes.shape}>ReactJS</div>
          <div className={classes.shape}>AngularJS</div>
          <div className={classes.shape}>VueJS</div>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(App);
