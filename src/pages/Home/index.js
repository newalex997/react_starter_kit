import React from 'react'
import classes from 'classnames'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from '../../common/components'
import { getAuthStatus, getAppUIVersion } from '../../selectors'

import Shelves from './components/Shelves'
import AddShelve from './components/AddShelve'

import './style.scss'

const Home = () => {
  const isAuthentificated = useSelector(getAuthStatus)
  const uiVersion = useSelector(getAppUIVersion)

  if (!isAuthentificated) {
    return <Redirect to="/login" />
  }

  return (
    <Layout>
      <div className={classes('homePage', { mobile: uiVersion === 'mobile' })}>
        <AddShelve />
        <Shelves />
      </div>
    </Layout>
  )
}

export default Home
