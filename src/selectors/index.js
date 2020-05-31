import { createSelector } from 'reselect'
import { defaultTo, path } from 'ramda'

export const getAppFetchingStatus = createSelector(
  path(['app', 'isFetching']),
  defaultTo(true),
)

export const getAuthStatus = createSelector(
  path(['auth', 'isAuthenticated']),
  defaultTo(false),
)

export const getLoginIsFetchingStatus = createSelector(
  path(['auth', 'loginIsFetching']),
  defaultTo(false),
)

export const getAuthUserToken = createSelector(
  path(['auth', 'access_token']),
  defaultTo(''),
)

export const getAppUIVersion = createSelector(
  path(['app', 'uiVersion']),
  defaultTo('descktop'),
)

export const getAuthUser = createSelector(path(['user']), defaultTo(null))
