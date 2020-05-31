import React from 'react'
import propTypes from 'prop-types'

const FormInput = ({ label, name, ...props }) => (
  <div className="formInput">
    <label htmlFor={name}>{label}</label>
    <input name={name} {...props} autoComplete="off" />
  </div>
)

FormInput.defaultProps = {
  value: '',
}

FormInput.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
}

export default FormInput
