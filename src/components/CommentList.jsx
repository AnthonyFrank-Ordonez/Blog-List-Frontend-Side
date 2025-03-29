import { useComment } from '../hooks'
import CommentForm from './CommentForm'

const CommentList = ({ id }) => {
  const {
    data: comments,
    isLoading: commentLoading,
    isError: commentsError,
  } = useComment(id)

  if (!comments) return null

  return (
    <>
      <CommentForm id={id} />
      <h3>Comments</h3>
      {commentLoading && <div>Loading Comments</div>}{' '}
      {commentsError && <div>There something error while fetching</div>}
      {comments.length >= 1 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.description}</li>
          ))}
        </ul>
      ) : (
        <div>There are no comments for these blog post</div>
      )}
    </>
  )
}

export default CommentList
