import { all, call, put, takeEvery } from 'redux-saga/effects'
import { SHELVES } from '../../../actions/library/types'
import { addNewShelveSucces } from '../../../actions/library'
import authorizedApiRequest from '../../../common/fetch/authorized'
import appendToFormData from '../../../common/fetch/appendToFormData'

import { getBooksSucces, getShelvesSucces } from '../../../actions/library'

export function* fetchBooksList(accessToken) {
  const payloadResponse = yield call(authorizedApiRequest, '/books', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (payloadResponse.status === 200) {
    const serverResponse = yield payloadResponse.json()

    yield put(getBooksSucces(serverResponse))
  }
}

export function* fetchShelvesList(accessToken) {
  const payloadResponse = yield call(authorizedApiRequest, '/shelves', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (payloadResponse.status === 200) {
    const serverResponse = yield payloadResponse.json()

    yield put(getShelvesSucces(serverResponse))
  }
}

function* addNewShelve({ payload, meta }) {
  const payloadResponse = yield call(authorizedApiRequest, '/shelves', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${meta.accessToken}`,
    },
    body: appendToFormData(new FormData(), payload),
  })

  if (payloadResponse.status === 200) {
    const serverResponse = yield payloadResponse.json()

    yield put(addNewShelveSucces(serverResponse))
  }
}

export default function* librarySagaWatcher() {
  yield all([takeEvery(SHELVES.ADD, addNewShelve)])
}
