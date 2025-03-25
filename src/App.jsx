// Import Services
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Import Components/From Src folder
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import AppRoutes from './routes/AppRoutes'
import { setBlogs } from './reducers/blogReducer'
import { useBlogs, useUsers } from './hooks'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  const { data: blogs, isSuccess: blogSuccess } = useBlogs()
  const { data: users, isSuccess: userSuccess } = useUsers()
  console.log('🚀 ~ App ~ users:', users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (blogs && blogSuccess) dispatch(setBlogs(blogs))
    if (users && userSuccess) dispatch(setUsers(users))
  }, [blogs, users, userSuccess, blogSuccess, dispatch])

  return (
    <div>
      <Notification />
      <NavigationBar />
      <AppRoutes />
    </div>
  )
}

export default App
