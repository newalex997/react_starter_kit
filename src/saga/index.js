import { all, takeEvery } from 'redux-saga/effects'

import { AUTH_STATE, LOGIN, LOGOUT } from '../actions/auth/types'
import auth, { login, logout } from './sagas/auth'

function* rootSaga() {
  yield all([
    takeEvery(AUTH_STATE.REQUEST, auth),
    takeEvery(LOGIN.REQUEST, login),
    takeEvery(LOGOUT.REQUEST, logout),
  ])
}

export default rootSaga
