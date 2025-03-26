import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// FROM SRC FOLDER
import Header from './Header'

const NavigationBar = () => {
  const { user } = useSelector((state) => state.users)
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        Home
      </Link>
      <Link style={padding} to='/users'>
        Users
      </Link>
      {user ? (
        <Header />
      ) : (
        <Link style={padding} to='/login'>
          Login
        </Link>
      )}
      <h2>Blog App</h2>
    </div>
  )
}

export default NavigationBar
