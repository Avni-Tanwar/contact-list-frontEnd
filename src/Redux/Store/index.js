import { createStore, applyMiddleware } from 'redux';
import saga from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../Reducers';
import rootSaga from '../Sagas/index';

const sagaMiddleware = saga();

const Store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default Store;
