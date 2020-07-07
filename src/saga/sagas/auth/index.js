import { all, call, put, takeEvery } from 'redux-saga/effects'
import { AUTH_STATE, LOGIN, LOGOUT } from '../../../actions/auth/types'
import authorizedApiRequest from '../../../common/fetch/authorized'

import fetchPersonalData from './profile'
import loginSaga from './login'
import logoutSaga from './logout'

import {
  loginSucces,
  setProfileData,
  refreshTokenSucces,
  fetchInitialStateFail,
  fetchInitialStateSucces,
} from '../../../actions/auth'

import { fetchBooksList, fetchShelvesList } from '../library'

export function* authSucces(status) {
  if (status === 'RESOLVED') {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const userData = yield call(fetchPersonalData, accessToken)

    // here we can do something with auth user data
    yield put(setProfileData(userData))

    // load books and shelves
    yield call(fetchBooksList, accessToken)
    yield call(fetchShelvesList, accessToken)
  }

  yield put(fetchInitialStateSucces())
}

export function* refreshAccessToken() {
  const oldToken = localStorage.getItem('ACCESS_TOKEN')

  const payload = yield call(authorizedApiRequest, '/account/refresh', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${oldToken}`,
    },
  })

  if (payload.status === 200) {
    const { access_token, expires_in } = yield payload.json()

    const now = new Date()
    const expiresOn = now.setSeconds(now.getSeconds() + expires_in)

    localStorage.setItem('ACCESS_TOKEN', access_token)
    localStorage.setItem('ACCESS_TOKEN_EXPIRES_ON', expiresOn)

    const userData = yield call(fetchPersonalData, access_token)

    yield put(refreshTokenSucces(access_token, expiresOn))
    yield put(setProfileData(userData))
  }
}

function* fetchAuthState() {
  const access_token = localStorage.getItem('ACCESS_TOKEN')
  const expires_in = localStorage.getItem('ACCESS_TOKEN_EXPIRES_ON')

  if (access_token && expires_in) {
    if (parseInt(expires_in, 10) > new Date().getTime()) {
      yield put(loginSucces({ access_token, expires_in }))
      yield call(authSucces, 'RESOLVED')
    } else {
      try {
        yield call(refreshAccessToken)
      } catch (e) {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('ACCESS_TOKEN_EXPIRES_ON')

        yield put(fetchInitialStateFail())
      }
    }
  }

  yield call(authSucces, 'REJECTED')
}

export default function* authSagaWatcher() {
  yield all([
    takeEvery(AUTH_STATE.REQUEST, fetchAuthState),
    takeEvery(LOGIN.REQUEST, loginSaga),
    takeEvery(LOGOUT.REQUEST, logoutSaga),
  ])
}
