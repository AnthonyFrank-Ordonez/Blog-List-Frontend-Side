import { Link } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux'

const NavigationBar = () => {
  const user = useSelector((state) => state.user)
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
    </div>
  )
}

export default NavigationBar
