import { Route, Routes } from 'react-router-dom'

// FROM SRC FOLDERS
import Users from '../components/Users'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../components/LoginPage'
import BlogList from '../components/BlogList'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/users'
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
