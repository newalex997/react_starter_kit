import { BOOKS, SHELVES } from '../../actions/library/types'

export default function library(state = {}, action) {
  switch (action.type) {
    case BOOKS.GET:
      return {
        ...state,
        books: action.payload,
      }
    case SHELVES.GET:
      return {
        ...state,
        shelves: action.payload,
      }
    case SHELVES.ADD_SUCCESS: {
      return {
        ...state,
        shelves: {
          itemsCount: state.shelves.itemsCount + 1,
          items: state.shelves.items.concat(action.payload),
        },
      }
    }
    default:
      return state
  }
}
