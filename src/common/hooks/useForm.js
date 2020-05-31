import { equals } from 'ramda'
import { useState } from 'react'

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const handleChange = event => {
    event.persist()

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  const customHandleChange = (key, value) => {
    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }

  const onResetState = () => {
    document.getElementById('inputForm').reset()

    if (Object.keys(values).find(equals('location'))) {
      document.getElementById('aputocomplete_input').value = ''
    }

    setValues(initialState)
  }

  return {
    customHandleChange,
    handleChange,
    handleResetForm: onResetState,
    values,
  }
}

export default useForm
