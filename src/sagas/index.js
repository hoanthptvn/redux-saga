import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { hideModel } from '../actions/modal';
import {
  addTaskFailed,
  addTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskFailed,
  deleteTaskSuccess,
} from '../actions/task';
import { hideLoading, showLoading } from '../actions/ui';
import { addTask, getList, updateTask, deleteTask } from '../apis/task';
import { STATUSES, STATUS_CODE } from '../constants/index';
import * as taskTypes from '../constants/task';

/**
 * B1: Thực thi action fetch task
 * B2: Gọi API
 * B2.1: Hiển thị thanh tiến trình ( loading )
 * B3: Kiểm tra status code
 * Nếu thành công...
 * Nếu thất bại...
 * B4: Tắt loading
 * B5: Thực thi các công việc tiếp theo
 */

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK);
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fetchListTaskFailed
      yield put(fetchListTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(
    fetchListTask({
      q: keyword,
    })
  );
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModel());
  } else {
    yield put(addTaskFailed(data));
  }
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.tasks.taskEditing);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    {
      title,
      description,
      status,
    },
    taskEditing.id
  );
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModel());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModel());
  } else {
    yield put(deleteTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}
export default rootSaga;
