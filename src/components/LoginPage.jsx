import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// FROM SRC FOLDER
import { setNotification } from '../reducers/notificationReducer'
import { setLoading } from '../reducers/blogReducer'
import { useField, useSetUser } from '../hooks'

const LoginPage = () => {
  const { reset: resetUser, ...username } = useField('text')
  const { reset: resetPass, ...password } = useField('password')
  const { mutateAsync: loginUser } = useSetUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(setLoading(true))
      await loginUser({ username: username.value, password: password.value })

      resetUser()
      resetPass()

      dispatch(setNotification('Login Success', 5000))
    } catch (error) {
      dispatch(setNotification('Invalid Username or password', 5000))
    } finally {
      dispatch(setLoading(false))
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input {...username} data-testid='username' name='Username' />
        </div>
        <div>
          Password:
          <input {...password} data-testid='password' name='Password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginPage
