import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return

  const successMsg = /added|created|success/i

  const isSuccess = successMsg.test(notification)

  const notificationStyle = {
    color: isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle} className='notification'>
      {notification}
    </div>
  )
}

export default Notification
