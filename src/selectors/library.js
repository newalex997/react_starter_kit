import { createSelector } from 'reselect'
import { defaultTo, path, propEq } from 'ramda'

const mergeShelveWithBooks = books => shelve => ({
  ...shelve,
  booksList: books.filter(propEq('shelve_id', shelve.id)),
})

const getUserBooks = createSelector(path(['library', 'books']), defaultTo({}))

const getUserShelves = createSelector(
  path(['library', 'shelves']),
  defaultTo({}),
)

export const getUserShelvesWithBooks = createSelector(
  getUserShelves,
  getUserBooks,
  (shelves, books) => shelves.items.map(mergeShelveWithBooks(books.items)),
)
