import { Box, Button, Stack, Typography } from '@mui/material'
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone'
import { Link } from 'react-router-dom'
import bgImage from '../assets/background.jpg'

function HomePage() {
  return (
    <Stack
      direction='row'
      justifyContent='center'
      minHeight='80vh'
      marginY='auto'
    >
      <Box padding={16} marginY='auto'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <AssignmentTwoToneIcon />
          <Typography variant='h4' fontWeight='medium'>
            Task Manager
          </Typography>
        </Stack>

        <Stack marginY={10} spacing={2}>
          <Typography variant='h3'>
            Welcome to my <br />
            Task Manager Project!
          </Typography>
          <Typography variant='subtitle1' color='GrayText'>
            Built by Mandy Yu
          </Typography>
        </Stack>

        <Button size='large' variant='contained' component={Link} to='/tasks'>
          See my tasks
        </Button>
      </Box>

      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '50%',
          margin: 8,
          borderRadius: 8,
        }}
      ></Box>
    </Stack>
  )
}
export default HomePage
