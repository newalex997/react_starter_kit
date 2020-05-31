import { call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { refreshAccessToken } from '../../saga/sagas/auth'

import fetchApiRequest from '.'

function* fetchAuthorizedApiRequest(url, options = {}) {
  const payload = yield call(fetchApiRequest, url, options)

  switch (payload.status) {
    case 401:
      try {
        yield call(refreshAccessToken)

        const retryPayload = yield call(fetchApiRequest, url, options)

        return retryPayload
      } catch (e) {
        yield put('LOGOUT_REQUIEST')
      }

      break
    default:
      return payload
  }

  return null
}

export default fetchAuthorizedApiRequest
