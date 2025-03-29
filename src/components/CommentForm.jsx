import { useCreateComment, useField } from '../hooks'

const CommentForm = ({ id }) => {
  const { reset: resetComment, ...comment } = useField('text')
  const { mutateAsync: createComment } = useCreateComment()

  const handleAddComment = async (event) => {
    event.preventDefault()
    await createComment({ id, description: comment.value })
    resetComment()
  }

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <input
          {...comment}
          name='comment'
          placeholder='Input your comment here'
        />
        <button type='submit'>Add Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
