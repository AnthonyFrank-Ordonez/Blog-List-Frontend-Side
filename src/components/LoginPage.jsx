import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setLoading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await dispatch(initializeUser({ username, password }))

      setUsername('')
      setPassword('')

      dispatch(setNotification('Login Success', 5000))
    } catch (error) {
      dispatch(setNotification('Invalid Username or password', 5000))
    } finally {
      setLoading(false)
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            data-testid='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='text'
            data-testid='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginPage
