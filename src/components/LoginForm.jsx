import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          const res = await axios.post('http://localhost:8000/login', values)
          const token = res.data.token

          if (token) {
            localStorage.setItem('token', token) // store JWT
            navigate('/tasks') // redirect to tasks
          } else {
            throw new Error('Failed to get token')
          }
        } catch (err) {
          console.error('Error:', err)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 300,
            }}
          >
            <Field
              as={TextField}
              label='Email'
              name='email'
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Field
              as={TextField}
              label='Password'
              name='password'
              type='password'
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button type='submit' variant='contained'>
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
