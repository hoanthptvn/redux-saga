import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Taskboard from '../Taskboard';
import theme from '../../commons/Theme';
// import Button from '@material-ui/core/Button';
import styles from './styles';

class App extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Taskboard />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
