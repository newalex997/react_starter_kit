import { call, put } from 'redux-saga/effects'
import authorizedApiRequest from '../../../common/fetch/authorized'

import { logoutSucces } from '../../../actions/auth'

function* logoutUser() {
  const accessToken = localStorage.getItem('ACCESS_TOKEN')
  const expiresOn = localStorage.getItem('ACCESS_TOKEN_EXPIRES_ON')

  if (parseInt(expiresOn, 10) > new Date().getTime()) {
    yield call(authorizedApiRequest, '/account/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('ACCESS_TOKEN_EXPIRES_ON')

    yield put(logoutSucces())
  }
}

export default logoutUser
