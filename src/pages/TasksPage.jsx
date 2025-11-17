import { useEffect, useState } from 'react'
import { TaskContext, TaskForm, TaskList } from '../components'
import axios from 'axios'
import { tasksSlice } from '../redux/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Snackbar } from '@mui/material'

function TasksPage() {
  const taskList = useSelector((state) => state.tasks)
  const dispatch = useDispatch()

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [loading, setLoading] = useState(false)

  const actions = tasksSlice.actions

  useEffect(() => {
    getTasks()
  }, [])

  async function getTasks() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { data } = response

      dispatch(actions.setTasks(data))
    } catch (error) {
      console.error('Something went wrong', error)

      dispatch(actions.setTasks([]))
    }
  }

  async function deleteTask(id) {
    // dispatch(actions.deleteTask(index))
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getTasks()
      showAlert('Task successfully deleted!', 'success')
    } catch (error) {
      console.error('Error deleting task:', error)
      showAlert('Error deleting task', 'error')
    }
  }

  async function addTask(description) {
    // dispatch(actions.addTask(description))
    const token = localStorage.getItem('token')
    try {
      await axios.post(
        `http://localhost:8000/tasks`,
        {
          description,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      showAlert('Created new task!')
      getTasks()
    } catch (error) {
      console.error('Something went wrong trying to create a new task', error)
    }
  }

  async function updateTaskField(id, field, value) {
    // dispatch(actions.updateTask({ index, field, value }))
    const token = localStorage.getItem('token')
    try {
      const task = taskList.find((t) => t.id === id)
      if (!task) return
      const updatedTask = { ...task, [field]: value }

      await axios.put(`http://localhost:8000/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`, // attach token
        },
      })
      await getTasks()
      showAlert('Task successfully updated!', 'success')
    } catch (error) {
      console.error('Error updating task:', error)
      showAlert('Error updating task', 'error')
    }
  }

  function updateCompleted(index, completed) {
    updateTaskField(index, 'completed', completed)
  }

  function updateDescription(index, description) {
    updateTaskField(index, 'description', description)
  }

  function showAlert(message, severity = 'success') {
    setAlert({ open: true, message, severity })
  }

  function handleCloseAlert() {
    setAlert({ ...alert, open: false })
  }

  return (
    <Box padding={4}>
      <TaskContext
        value={{
          tasks: taskList,
          loading,
          addTask,
          deleteTask,
          updateCompleted,
          updateDescription,
        }}
      >
        <TaskForm />
        <TaskList />
      </TaskContext>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TasksPage
