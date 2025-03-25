import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!user) return

  return (
    <em>
      {user.name} logged-in{' '}
      <button onClick={() => dispatch(removeUser(null))}>Log out</button>{' '}
    </em>
  )
}

export default Header
