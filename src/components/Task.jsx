import { useState } from 'react'
import EditDescription from './EditDescription'
import { useTaskContext } from './TaskContext'
import { Checkbox, Typography, IconButton, Stack, Box } from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as EyeIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Task({ id, description = '', completed = false, index }) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const { deleteTask, updateCompleted, updateDescription } = useTaskContext()

  const handleEdit = (id, newDescription) => {
    updateDescription(id, newDescription)
    setEditing(false)
  }

  const handleCancelEdit = () => {
    setEditing(false)
  }

  const handleDelete = () => {
    deleteTask(id)
    setEditing(false)
  }

  const handleView = () => {
    navigate(`/tasks/${id}`)
  }

  return (
    <Box
      sx={{
        p: 1.5,
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
      }}
    >
      <Stack direction='row' alignItems='center' spacing={2} flexGrow={1}>
        <Checkbox
          checked={completed}
          onChange={(e) => updateCompleted(index, e.target.checked)}
          color='primary'
        />

        {editing ? (
          <EditDescription
            index={index}
            id={id}
            description={description}
            onEdit={handleEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <Typography
            variant='body1'
            sx={{
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? 'text.secondary' : 'text.primary',
              flexGrow: 1,
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>

      <Stack direction='row' spacing={1}>
        {!completed && !editing && (
          <IconButton
            color='primary'
            size='small'
            onClick={() => setEditing(true)}
          >
            <EditIcon />
          </IconButton>
        )}

        <IconButton color='error' size='small' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>

        <IconButton size='small' onClick={handleView}>
          <EyeIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Task
