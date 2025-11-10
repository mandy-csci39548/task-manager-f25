import { useState } from 'react'

function EditDescription({ id, index, description, onEdit, onCancel }) {
  const [descriptionField, setDescriptionField] = useState(description)

  const handleSubmit = (e) => {
    e.preventDefault()
    onEdit(id, descriptionField)
  }

  const handleCancel = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id={`edit-description-${index}`}
        placeholder='Enter description'
        value={descriptionField}
        onChange={(e) => setDescriptionField(e.target.value)}
        onKeyDown={handleCancel}
      />
    </form>
  )
}
export default EditDescription
