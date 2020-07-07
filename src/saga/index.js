import { all, call } from 'redux-saga/effects'

import authSaga from './sagas/auth'
import librarySaga from './sagas/library'

function* rootSaga() {
  yield all([call(authSaga), call(librarySaga)])
}

export default rootSaga
