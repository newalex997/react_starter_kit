import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUserToken } from '../../../../selectors'
import { addNewShalve } from '../../../../actions/library'
import { FormInput } from '../../../../common/components'
import { useForm, useFormValidator } from '../../../../common/hooks'

const NewShalveForm = ({ defaultFormData }) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(getAuthUserToken)

  const { handleResetForm, handleChange, values } = useForm(defaultFormData)
  const { onSubmitForm, statusNode } = useFormValidator({
    succes: 'shelve was added succesfuly!',
  })

  const handleSubmitForm = e => {
    e.preventDefault()

    dispatch(
      addNewShalve(
        {
          formData: {
            ...values,
            categories: values.categories.split(','),
          },
          submitCallback: response => {
            if (response.status === 200) {
              handleResetForm()
            }

            onSubmitForm(response)
          },
        },
        accessToken,
      ),
    )
  }

  return (
    <form className="inputForm" onSubmit={handleSubmitForm}>
      <FormInput
        label="Shelve Label"
        name="label"
        type="string"
        value={values.title}
        onChange={handleChange}
      />
      <FormInput
        label="Description"
        name="description"
        type="string"
        value={values.description}
        onChange={handleChange}
      />
      <FormInput
        label="Categories"
        name="categories"
        type="string"
        placeholder='split them by ","'
        value={values.categories}
        onChange={handleChange}
      />
      <div className="formFooter">
        {statusNode}
        <button type="submit" className="button">
          submit
        </button>
      </div>
    </form>
  )
}

NewShalveForm.defaultProps = {
  defaultFormData: {},
}

export default NewShalveForm
