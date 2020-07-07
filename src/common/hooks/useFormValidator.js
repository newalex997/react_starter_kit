import React, { useState } from 'react'
import classes from 'classnames'

const defaultMessages = {
  succes: 'succes submit!',
  update: 'succes update!',
  invalid: 'invalid form data!',
  error: 'server error!',
}

const useForm = ({
  succes = defaultMessages.succes,
  update = defaultMessages.update,
  invalid = defaultMessages.invalid,
  error = defaultMessages.error,
}) => {
  const [submitStatus, setSubmitStatus] = useState({ message: null })

  const onSubmitForm = ({ status }) => {
    switch (status) {
      case 200:
        setSubmitStatus({
          status,
          message: succes,
        })

        setTimeout(() => {
          setSubmitStatus({ message: null })
        }, 10000)

        break
      case 204:
        setSubmitStatus({
          status,
          message: update,
        })
        break

      case 422:
        setSubmitStatus({
          status,
          message: invalid,
        })
        break
      default:
        setSubmitStatus({
          status,
          message: error,
        })
    }
  }

  return {
    onSubmitForm,
    statusNode: (
      <span
        className={classes('submitStatus', {
          success: submitStatus.status === 200 || submitStatus.status === 204,
          warn: submitStatus.status === 422,
          error: submitStatus.status && submitStatus.status === 500,
        })}
      >
        {submitStatus.message}
      </span>
    ),
  }
}

export default useForm
