import { PROFILE } from '../../actions/auth/types'

function reducer(state = {}, action) {
  if (PROFILE.SET_DETAILS === action.type) {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}

export default reducer
