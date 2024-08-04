import AppContext from './contexts/AppContext'
import Router from './routes'
import { GlobalStyles } from './theme'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AppContext>
      <GlobalStyles />
      <Router />
    </AppContext>
  )
}
