import { LOGIN, LOGOUT, AUTH_STATE, PROFILE, TOKEN } from './types'

export const requestFetchInItialState = () => ({
  type: AUTH_STATE.REQUEST,
})

export const fetchInitialStateSucces = () => ({
  type: AUTH_STATE.SUCCESS,
})

export const fetchInitialStateFail = () => ({
  type: AUTH_STATE.FAILURE,
})

export const requestLogin = ({ email, password }) => ({
  type: LOGIN.REQUEST,
  payload: { email, password },
})

export const loginSucces = ({ access_token, expires_in }) => ({
  type: LOGIN.SUCCESS,
  payload: { access_token, expires_in },
})

export const loginFail = errors => ({
  type: LOGIN.FAILURE,
  payload: errors,
})

export const requrstLogout = () => ({
  type: LOGOUT.REQUEST,
})

export const logoutSucces = () => ({
  type: LOGOUT.SUCCESS,
})

export const refreshTokenSucces = ({ access_token, expires_in }) => ({
  type: TOKEN.REFRESH,
  payload: { access_token, expires_in },
})

export const setProfileData = profileDetails => ({
  type: PROFILE.SET_DETAILS,
  payload: profileDetails,
})
