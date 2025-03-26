import { Route, Routes } from 'react-router-dom'

// FROM SRC FOLDERS
import Users from '../components/Users'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../components/LoginPage'
import BlogList from '../components/BlogList'
import User from '../components/User'
import Blog from '../components/Blog'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/blogs/:id'
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/users/:id'
        element={
          <ProtectedRoute>
            <User />
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
