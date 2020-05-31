import React from 'react'
import classes from 'classnames'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Layout } from '../../common/components'
import { getAuthStatus, getAppUIVersion } from '../../selectors'

import './style.scss'

const Deshboard = () => {
  const isAuthentificated = useSelector(getAuthStatus)
  const uiVersion = useSelector(getAppUIVersion)

  if (!isAuthentificated) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <div className={classes('deshboard', { mobile: uiVersion === 'mobile' })}>
        deshboard
      </div>
    </Layout>
  )
}
export default Deshboard
