import { BOOKS, SHELVES } from './types'

export const getBooksSucces = payload => ({
  type: BOOKS.GET,
  payload,
})

export const getShelvesSucces = payload => ({
  type: SHELVES.GET,
  payload,
})

export const addNewShalve = (payload, meta) => ({
  type: SHELVES.ADD,
  payload,
  meta,
})

export const addNewShelveSucces = payload => ({
  type: SHELVES.ADD_SUCCESS,
  payload,
})
