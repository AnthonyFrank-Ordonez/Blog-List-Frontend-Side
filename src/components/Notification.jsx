const Notification = ({ message }) => {
  if (message === null) return null
  const successMsg = /added|created|success/i

  const isSuccess = successMsg.test(message)

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
    <div style={notificationStyle} className='message'>
      {message}
    </div>
  )
}

export default Notification
