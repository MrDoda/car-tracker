import { Routes, Route, HashRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import { useStore } from './store/useStore'
import { appStore } from './store/appStore'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ProtectedRoutes from './Components/ProtectedRoutes'

export const Router = () => {
  const token = useStore(appStore, 'token')

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes isAuthenticated={!!token} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
