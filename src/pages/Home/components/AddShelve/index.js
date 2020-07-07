import React, { Fragment, useState } from 'react'
import { Popup } from '../../../../common/components'
import NewShalveForm from '../NewShalveForm'
import './style.scss'

const AddShelve = () => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal(!showModal)

  return (
    <Fragment>
      <div className="button add-shelve" onClick={toggleModal}>
        Add Shelve
      </div>

      {showModal && (
        <Popup onClose={toggleModal} compact>
          <NewShalveForm />
        </Popup>
      )}
    </Fragment>
  )
}

export default AddShelve
