import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { requestLogin } from '../../actions/auth'
import { useForm } from '../../common/hooks'
import { FormInput, Layout } from '../../common/components'
import { getAuthStatus, getLoginIsFetchingStatus } from '../../selectors'

const LoginPage = () => {
  const { values: formData, handleChange: setFormData } = useForm()
  const dispatch = useDispatch()

  const isAuthentificated = useSelector(getAuthStatus)
  const loginIsFetching = useSelector(getLoginIsFetchingStatus)

  const handleSubmitForm = e => {
    e.preventDefault()

    dispatch(requestLogin(formData))
  }

  if (isAuthentificated) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <form onSubmit={handleSubmitForm} className="inputForm">
        <FormInput
          label="Email"
          name="email"
          type="string"
          value={formData.email}
          onChange={setFormData}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={setFormData}
        />
        <div className="formFooter">
          <button type="submit" className="button" disabled={loginIsFetching}>
            {(loginIsFetching && 'submit...') || 'submit'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default LoginPage
