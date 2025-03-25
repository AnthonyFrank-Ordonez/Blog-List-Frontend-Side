// Import Services
import { useEffect } from 'react'

// Import Components
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import NavigationBar from './components/NavigationBar'
import AppRoutes from './routes/AppRoutes'

// PS.
// THUNK/Thunk -- REDUX THUNK

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  // const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Notification />
      <NavigationBar />
      <AppRoutes />
    </div>
  )
}

export default App
