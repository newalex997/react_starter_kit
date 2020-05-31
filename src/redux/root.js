import { combineReducers } from 'redux'
import { pick } from 'ramda'

import { LOGOUT } from '../actions/auth/types'

import user from './reducers/user'
import auth from './reducers/auth'
import app from './reducers/appState'

const combinedReducers = combineReducers({
  app,
  user,
  auth,
})

function reducer(state, action) {
  if (action.type === LOGOUT.SUCCESS) {
    state = { ...pick(['app'], state) }
  }

  return combinedReducers(state, action)
}

export default reducer
