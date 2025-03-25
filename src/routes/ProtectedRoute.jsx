import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user)

  if (!user) return <Navigate replace to='/login' />

  return props.children
}

export default ProtectedRoute
