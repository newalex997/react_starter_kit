import React from 'react'
import { useSelector } from 'react-redux'
import { getUserShelvesWithBooks } from '../../../../selectors/library'

import Shelve from './Shelve'

const Shelves = () => {
  const userShelves = useSelector(getUserShelvesWithBooks)

  return (
    <div className="shelves-list">
      {(userShelves.length &&
        userShelves.map(shelve => <Shelve key={shelve.id} {...shelve} />)) ||
        'no shelves fount'}
    </div>
  )
}

export default Shelves
