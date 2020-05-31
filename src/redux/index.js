import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import appSagas from '../saga'
import appReducers from './root'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  appReducers,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(appSagas)
