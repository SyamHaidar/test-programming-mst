import { useRoutes } from 'react-router-dom'
import MainRoutes from './MainRoutes'

// ----------------------------------------------------------------------

const Router = () => {
  const routes = useRoutes([...MainRoutes])

  return routes
}

export default Router
