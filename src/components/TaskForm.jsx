import { useEffect, useRef, useState } from 'react'
import { useTaskContext } from './TaskContext'
import { Box, Paper, TextField, Button } from '@mui/material'

function TaskForm() {
  const [description, setDescription] = useState('')
  const { addTask } = useTaskContext()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim()) return
    addTask(description)
    setDescription('')
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        maxWidth: 350,
        mx: 'auto',
        mt: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          id='description'
          label='Add task'
          variant='outlined'
          value={description}
          inputRef={inputRef}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size='small'
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
          sx={{
            px: 2,
            py: 0.8,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            whiteSpace: 'nowrap',
          }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  )
}

export default TaskForm
