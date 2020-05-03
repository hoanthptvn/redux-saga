import * as taskAPIs from '../apis/task';
import * as taskConstants from '../constants/task';

export const fetchListTask = () => {
  return {
    type: taskConstants.FETCH_TASK,
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskConstants.FETCH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTaskFailed = (error) => {
  return {
    type: taskConstants.FETCH_TASK_FAILED,
    payload: {
      error,
    },
  };
};

/**
 * B1: fetchListTaskRequest
 * B2: reset state tasks => []
 * B3: fetchListTaskSuccess(data response)
 * B4: fetchListTaskFailed(error)
 */

export const fetchListTaskRequest = () => {
  return (dispatch) => {
    dispatch(fetchListTask());
    taskAPIs
      .getList()
      .then((resp) => {
        dispatch(fetchListTaskSuccess(resp.data));
      })
      .catch((error) => {
        dispatch(fetchListTaskFailed(error));
      });
  };
};
