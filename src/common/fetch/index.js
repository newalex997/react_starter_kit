import config from '../utils/config'

function removeFalsyValues(paramsList = {}) {
  const newObj = {}

  Object.keys(paramsList).forEach(prop => {
    if (paramsList[prop]) {
      newObj[prop] = paramsList[prop]
    }
  })

  return newObj
}

export function queryBuilder(paramsList = {}) {
  const validKeys = removeFalsyValues(paramsList)

  const keys = Object.keys(validKeys)
  const value = Object.values(validKeys)
  let query = ''

  // eslint-disable-next-line no-restricted-syntax
  for (const item in keys) {
    if (item > 0) query += `&${keys[item]}=${value[item]}`
    else query += `?${keys[item]}=${value[item]}`
  }

  return query
}

export function createFetch() {
  const defaults = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
    },
  }

  return (url, options = {}) =>
    fetch(`${config.apiUrl}${url}`, {
      ...defaults,
      ...options,
      headers: {
        ...defaults.headers,
        ...(options && options.headers),
      },
    })
}

function fetchApiRequest(url, options = {}) {
  return createFetch()(url, options).then(
    response => response,
    response => response,
  )
}

export default fetchApiRequest
