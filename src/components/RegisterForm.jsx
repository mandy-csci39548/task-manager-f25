import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'
import axios from 'axios'

export default function RegisterForm() {
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  })

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          const res = await axios.post('http://localhost:8000/register', values)
          console.log('Success:', res.data)
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

            <Field
              as={TextField}
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <Button type='submit' variant='contained'>
              Register
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
