import React, { useEffect, useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchInItialState } from './actions/auth'
import { determineUIVersion, switchUIVersion } from './actions'
import { LoadingSpinner } from './common/components'
import { getAppFetchingStatus, getAppUIVersion } from './selectors'

import Home from './pages/Home'
import LogInPage from './pages/Login'
import NotFoundPage from './pages/NotFound'

const App = () => {
  const dispatch = useDispatch()
  const appIsFetching = useSelector(getAppFetchingStatus)
  const UIVersion = useSelector(getAppUIVersion)

  const switchUIVersionIfNeeded = useCallback(() => {
    const DUIVersion = determineUIVersion()

    if (DUIVersion !== UIVersion) {
      dispatch(switchUIVersion(DUIVersion))
    }
  }, [UIVersion, dispatch])

  useEffect(() => {
    window.addEventListener('resize', switchUIVersionIfNeeded)

    return () => {
      window.removeEventListener('resize', switchUIVersionIfNeeded)
    }
  }, [dispatch, switchUIVersionIfNeeded])

  useEffect(() => {
    dispatch(requestFetchInItialState())
  }, [dispatch])

  if (appIsFetching) {
    return <LoadingSpinner />
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={LogInPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default App
