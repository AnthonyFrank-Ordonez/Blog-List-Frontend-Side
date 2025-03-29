import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

// FROM SRC FOLDERS
import blogService from '../services/blogs'
import userService from '../services/user'
import loginService from '../services/login'
import { addBlog, addVote, deleteBlog, setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/usersReducer'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    type,
    onChange,
    reset,
  }
}

// BLOGS
// CUSTOM HOOKS FOR FETCHING ALL BLOGS
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })
}

// CREATE
export const useCreateNewBlog = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      dispatch(addBlog(newBlog))
    },
  })
}

// UPDATE BLOG
export const useUpdateBlogVote = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      dispatch(addVote(updatedBlog))
    },
  })
}

// DELETE
export const useDeleteBlog = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: blogService.deleteBLog,
    onSuccess: (_, id) => {
      dispatch(deleteBlog(id))
    },
  })
}

// USERS
// CUSTOM HOOKS FOR FETCHING ALL BLOGS
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
    refetchOnWindowFocus: false,
  })
}

// SET
export const useSetUser = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      blogService.setToken(user.token)
      dispatch(setUser(user))
    },
  })
}

// COMMENTS

// CUSTOM HOOKS FOR FETCHING ALL BLOG COMMENTS
export const useComment = (id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['comments', id],
    queryFn: () => blogService.getComments(id),
    enabled: !!id && !queryClient.getQueryData(['comments', id]), // only fetched if the cache data does not exist
    refetchOnWindowFocus: false,
    retry: 1,
    // cacheTime: 1000 * 60 * 60 * 24 * 2 - milliseconds * minutes * hour * number_of_hours * how_many_days
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (data, { id }) => {
      const comments = queryClient.getQueryData(['comments', id])
      queryClient.setQueryData(['comments', id], comments.concat(data))
    },
  })
}
