import { APP } from '../../actions/types'
import { AUTH_STATE } from '../../actions/auth/types'
import { determineUIVersion } from '../../actions'

const initialState = {
  uiVersion: determineUIVersion(),
}

export default function conf(state = initialState, action) {
  switch (action.type) {
    case AUTH_STATE.SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case AUTH_STATE.REQUEST:
    case AUTH_STATE.FAILURE:
      return {
        ...state,
        isFetching: true,
      }
    case APP.SWITCH_UI_VERSION:
      return {
        ...state,
        uiVersion: action.payload,
      }
    case APP.FORM_IS_FETCHING:
      return {
        ...state,
        formIsFetching: action.payload,
      }
    case APP.SUBMIT_FORM_ERROR:
      return {
        ...state,
        submitFormErrors: action.payload,
      }
    default:
      return state
  }
}
