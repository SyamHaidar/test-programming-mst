import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import { Box } from '../theme'

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box sx={{ display: 'block', margin: 'auto', maxWidth: '2160px', overflow: 'hidden' }}>
      <Header />
      <Outlet />
    </Box>
  )
}
