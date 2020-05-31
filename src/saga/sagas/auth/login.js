import { call, put } from 'redux-saga/effects'

import apiRequest from '../../../common/fetch'
import appendToFormData from '../../../common/fetch/appendToFormData'
import { loginFail, loginSucces } from '../../../actions/auth'
import { authSucces } from '.'

function* loginUser({ payload: { email, password } }) {
  const payload = yield call(apiRequest, '/account/login', {
    method: 'POST',
    credentials: 'include',
    body: appendToFormData(new FormData(), {
      email,
      password,
    }),
  })

  if (payload.status === 200) {
    const { access_token, expires_in } = yield payload.json()

    const now = new Date()
    const expiresOn = now.setSeconds(now.getSeconds() + expires_in)

    localStorage.setItem('ACCESS_TOKEN', access_token)
    localStorage.setItem('ACCESS_TOKEN_EXPIRES_ON', expiresOn)

    yield call(authSucces, 'RESOLVED')
    yield put(loginSucces({ access_token, expires_in: expiresOn }))
  } else {
    yield put(loginFail({}))
  }
}

export default loginUser
