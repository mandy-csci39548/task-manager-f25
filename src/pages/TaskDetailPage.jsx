import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Paper, Typography, Chip, CircularProgress } from '@mui/material'

function TaskDetailPage() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTask()
  }, [])

  async function getTask() {
    try {
      const response = await axios.get(`http://localhost:8000/tasks/${id}`)
      setTask(response.data)
    } catch (error) {
      console.error(error)
      setTask(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    )

  if (!task)
    return (
      <Typography
        variant='h6'
        align='center'
        color='text.secondary'
        sx={{ mt: 4 }}
      >
        Task not found.
      </Typography>
    )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          variant='h5'
          fontWeight={600}
          gutterBottom
          textAlign='center'
        >
          Task Detail
        </Typography>

        <Typography variant='body1' sx={{ mb: 2 }}>
          <strong>Description:</strong> {task.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Chip
            label={task.completed ? 'Completed' : 'Not Completed'}
            color={task.completed ? 'success' : 'warning'}
            variant='outlined'
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 2,
              py: 0.5,
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default TaskDetailPage
