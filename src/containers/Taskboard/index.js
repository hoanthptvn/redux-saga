import { Box, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as taskActions from '../../actions/task';
import SearchBox from '../../components/SearchBox';
import TaskList from '../../components/TaskList';
import { STATUSES } from '../../constants';
import TaskForm from '../TaskForm';
import styles from './styles';

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreator } = this.props;
    const { fetchListTask } = taskActionCreator;
    fetchListTask();
  }

  openForm = () => {
    const { modalActionCreator, taskActionCreator } = this.props;
    const { setTaskEditing } = taskActionCreator;
    setTaskEditing(null);
    const {
      showModal,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreator;
    showModal();
    changeModalTitle('Thêm mới công việc');
    changeModalContent(<TaskForm />);
  };

  loadData = () => {
    const { taskActionCreator } = this.props;
    const { fetchListTask } = taskActionCreator;
    fetchListTask();
  };

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionCreator } = this.props;
    const { filterTask } = taskActionCreator;
    filterTask(value);
  };

  handleEditTask = (task) => {
    const { taskActionCreator, modalActionCreator } = this.props;
    const { setTaskEditing } = taskActionCreator;
    setTaskEditing(task);
    const {
      showModal,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreator;
    showModal();
    changeModalTitle('Cập nhật công việc');
    changeModalContent(<TaskForm />);
  };

  showModalDeleteTask = (task) => {
    const { modalActionCreator, classes } = this.props;
    const {
      showModal,
      hideModel,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreator;
    showModal();
    changeModalTitle('Xóa công việc');
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Bạn chắc muốn xóa{' '}
          <span className={classes.modalConfirmTextBold}>{task.title} ?</span>
          <Box display="flex" flexDirection="row-reverse" mt={2}>
            <Box ml={1}>
              <Button variant="contained" onClick={hideModel}>
                Huy bỏ
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleDeleteTask(task)}
              >
                Đồng ý
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    );
  };

  handleDeleteTask(task) {
    const { id } = task;
    console.log(id);
    const { taskActionCreator } = this.props;
    const { deleteTask } = taskActionCreator;
    deleteTask(id);
  }

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              key={index}
              status={status}
              index={index}
              tasks={taskFiltered}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.loadData}
          style={{ marginRight: 20 }}
        >
          Load Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon /> Thêm mới công việc
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreator: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
  }),
  modalActionCreator: PropTypes.shape({
    showModal: PropTypes.func,
    hideModel: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listTask: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.tasks.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreator: bindActionCreators(taskActions, dispatch),
    modalActionCreator: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
