import { isNil } from 'ramda'

function appendToFormData(formData, data, keyPrefix) {
  if (data instanceof Object) {
    Object.keys(data).forEach(k => {
      const v = data[k]

      if (!isNil(v)) {
        if (keyPrefix) {
          k = `${keyPrefix}[${k}]`
        }

        if (v instanceof Object && v.constructor.name === 'Object') {
          return appendToFormData(formData, v, k)
        }

        if (v instanceof Array) {
          v.forEach((v, i) => {
            if (v instanceof Object && v.constructor.name === 'Object') {
              appendToFormData(formData, v, `${k}[${i}]`)
            } else {
              formData.append(`${k}[${i}]`, v)
            }
          })
        } else {
          formData.append(k, v)
        }
      }
    })
  }

  return formData
}

export default appendToFormData
