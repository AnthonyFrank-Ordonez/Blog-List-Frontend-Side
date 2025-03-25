import { useDispatch, useSelector } from 'react-redux'

// FROM SRC FOLDER
import { removeUser } from '../reducers/usersReducer'

const Header = () => {
  const { user } = useSelector((state) => state.users)
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
