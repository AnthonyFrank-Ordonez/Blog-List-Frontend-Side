import { Route, Routes } from 'react-router-dom'
import Users from '../components/Users'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../components/LoginPage'
import BlogList from '../components/BlogList'
import { useState } from 'react'

const AppRoutes = () => {
  const [isLoading, setLoading] = useState(false)

  return (
    <Routes>
      <Route path='/login' element={<LoginPage setLoading={setLoading} />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <BlogList isLoading={isLoading} />
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
