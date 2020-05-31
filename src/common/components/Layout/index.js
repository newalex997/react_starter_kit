import React from 'react'
import classes from 'classnames'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthStatus, getAuthUser } from '../../../selectors'
import { requrstLogout } from '../../../actions/auth'
import Navigation from './Nav'

import './layout.scss'

const Layout = ({ children, noMargin }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getAuthStatus)
  const authUser = useSelector(getAuthUser)

  const logoutUser = () => dispatch(requrstLogout())

  return (
    <div className={classes('wrap', { noMargin })}>
      <Navigation
        isAuthenticated={isAuthenticated}
        handleLogoutUser={logoutUser}
        authUser={authUser}
      />
      <main>{children}</main>
    </div>
  )
}

Layout.defaultProps = {
  noMargin: false,
}

Layout.propTypes = {
  children: propTypes.node,
  noMargin: propTypes.bool,
}

export default Layout
