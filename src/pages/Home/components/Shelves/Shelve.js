import React, { useState, useMemo } from 'react'
import { prop } from 'ramda'
import { Popup } from '../../../../common/components'
import NewShalveForm from '../NewShalveForm'
import Book from '../Book'

const Shelve = ({ id, title, description, booksList, categories }) => {
  const [showEditModal, setShoweEditModal] = useState(false)

  const categoriesList = useMemo(
    () => categories.map(prop('label')).join(','),
    [categories],
  )

  const toggleEditModal = () => setShoweEditModal(!showEditModal)

  return (
    <div className="shelve-item">
      <div className="header">
        <div className="title">{title}</div>
        <div className="flex-end">
          <button className="button" onClick={toggleEditModal}>
            Edit
          </button>
        </div>
      </div>
      <div className="categories">{categoriesList}</div>
      <div className="description">{description}</div>
      <div className="books-list">
        {(booksList.length &&
          booksList.map(book => <Book key={book.id} {...book} />)) ||
          'no books found'}
      </div>

      {showEditModal && (
        <Popup onClose={toggleEditModal} compact>
          <NewShalveForm
            defaultFormData={{
              id,
              title,
              description,
              categories: categoriesList,
            }}
          />
        </Popup>
      )}
    </div>
  )
}

export default Shelve
