import { LOGIN, TOKEN } from '../../actions/auth/types'

const loginRequiest = state => ({
  ...state,
  loginIsFetching: true,
  isAuthenticated: false,
})

const loginsucces = (state, { access_token, expires_in }) => ({
  ...state,
  loginIsFetching: false,
  isAuthenticated: true,
  loginErrors: null,
  access_token,
  expires_in,
})

const loginFailure = (state, { errors }) => ({
  ...state,
  loginIsFetching: false,
  isAuthenticated: false,
  loginErrors: errors,
})

const refreshAccessTokenSucces = (state, { access_token, expires_in }) => ({
  ...state,
  isAuthenticated: true,
  access_token,
  expires_in,
})

export default function auth(state = {}, action) {
  switch (action.type) {
    case LOGIN.REQUEST:
      return loginRequiest(state)
    case LOGIN.SUCCESS:
      return loginsucces(state, action.payload)
    case LOGIN.FAILURE:
      return loginFailure(state, action.payload)
    case TOKEN.REFRESH:
      return refreshAccessTokenSucces(state, action.payload)
    default:
      return state
  }
}
