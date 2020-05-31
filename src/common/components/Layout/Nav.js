import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import propTypes from 'prop-types'

const Nav = ({ authUser, handleLogoutUser, isAuthenticated }) => (
  <header className="header">
    <nav>
      <div className="pullLeft">
        {isAuthenticated && (
          <Fragment>
            <NavLink to="/deshboard" className="navLink">
              {authUser.email}
            </NavLink>
          </Fragment>
        )}
      </div>
      <div className="pullRight">
        {(isAuthenticated && (
          <button className="navLink" onClick={handleLogoutUser}>
            Logout
          </button>
        )) || (
          <NavLink to="/login" className="navLink">
            LogIn
          </NavLink>
        )}
      </div>
    </nav>
  </header>
)

Nav.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  handleLogoutUser: propTypes.func.isRequired,
  authUser: propTypes.instanceOf(Object),
}

export default Nav
