import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalActions from '../../actions/modal';
import renderTextField from '../../components/FormHelper/TextField';
import renderSelectField from '../../components/FormHelper/Select';
import styles from './styles';
import validate from './validate';
import * as taskActions from '../../actions/task';

class TaskForm extends Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreators, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionsCreators;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
  };

  renderStatusSelection() {
    let xhtml = null;
    const { taskEditing, classes } = this.props;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Trạng thái"
          className={classes.select}
          margin="normal"
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

  render() {
    const {
      classes,
      modalActionCreators,
      handleSubmit,
      invalid,
      submitting,
      taskEditing,
    } = this.props;
    const { hideModel } = modalActionCreators;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
              value={taskEditing ? taskEditing.title : ''}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Mô tả"
              multline
              rowMax="4"
              className={classes.textField}
              margin="normal"
              component={renderTextField}
              name="description"
              value={taskEditing ? taskEditing.description : ''}
            />
          </Grid>
          {this.renderStatusSelection()}
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModel}>
                  Hủy Bỏ
                </Button>
              </Box>
              <Button
                disabled={invalid || submitting}
                color="primary"
                variant="contained"
                type="submit"
              >
                Lưu Lại
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  taskActionsCreators: PropTypes.shape({
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskEditing: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    taskEditing: state.tasks.taskEditing,
    initialValues: {
      title: state.tasks.taskEditing ? state.tasks.taskEditing.title : null,
      description: state.tasks.taskEditing
        ? state.tasks.taskEditing.description
        : null,
      status: state.tasks.taskEditing ? state.tasks.taskEditing.status : null,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
  taskActionsCreators: bindActionCreators(taskActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_MANAGEMENT';

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
