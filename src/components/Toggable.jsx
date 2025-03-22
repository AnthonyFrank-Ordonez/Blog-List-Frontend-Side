import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  // Use to hide and show the Login or New Note/Blog Buttons
  const hideWhenFormVisible = { display: visible ? 'none' : '' }
  // Use to dynamically hide/show when the "the new blog/note" btn is visible or not
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      {/* Button for the new blog */}
      <div style={hideWhenFormVisible}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      {/* The form for adding new blog */}
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

Toggable.displayName = 'Toggable'

export default Toggable
