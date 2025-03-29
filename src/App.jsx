// Import Components/From Src folder
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import AppRoutes from './routes/AppRoutes'

import { useBlogs, useUsers } from './hooks'

const App = () => {
  const { isSuccess: blogSuccess, isError: blogError } = useBlogs()
  const { isSuccess: userSuccess, isError: userError } = useUsers()

  return (
    <>
      {(blogError || userError) && (
        <div>Sorry this site is currently unavailable</div>
      )}

      {blogSuccess && userSuccess && (
        <div>
          <Notification />
          <NavigationBar />
          <AppRoutes />
        </div>
      )}
    </>
  )
}

export default App
