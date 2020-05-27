import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modal';
import taskReducer from './task';
import uiReducer from './ui';

const rootReducer = combineReducers({
  tasks: taskReducer,
  ui: uiReducer,
  modal: modalReducer,
  form: formReducer,
});

export default rootReducer;
