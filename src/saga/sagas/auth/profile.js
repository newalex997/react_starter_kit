import { call } from 'redux-saga/effects'
import authorizedApiRequest from '../../../common/fetch/authorized'

import logoutUser from './logout'

function* fetchPersonalData(accessToken) {
  const payload = yield call(authorizedApiRequest, '/account/details', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  switch (payload.status) {
    case 200:
      return yield payload.json()
    default:
      yield call(logoutUser)
  }
}

export default fetchPersonalData
