import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldNotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware];
  const enhances = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, composeEnhancers(...enhances));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
