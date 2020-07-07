import React from 'react'

const Book = ({ id, title, description, category }) => {
  return (
    <div className="book-item">
      <div className="title">{title}</div>
      <div className="category">{category.label}</div>
      <div className="description">{description}</div>
    </div>
  )
}

export default Book
