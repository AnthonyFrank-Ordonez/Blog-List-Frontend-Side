import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching in getAll blogs: ',
      error.response.data || error
    )
    throw error
  }
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error in create() blogs: ', error.response.data || error)
    throw error
  }
}

const update = async (object) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(`${baseUrl}/${object.id}`, object, config)
    return response.data
  } catch (error) {
    console.error('Error in update() blogs: ', error.response.data || error)
    throw error
  }
}

const deleteBLog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error in deleteBlogs: ', error.response.data || error)
    throw error
  }
}

const getComments = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.get(`${baseUrl}/${blogId}/comments`, config)
    return response.data
  } catch (error) {
    console.error('Error in getComments: ', error.response.data || error)
    throw error
  }
}

const addComment = async ({ id, description }) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(
      `${baseUrl}/${id}/comment`,
      { description },
      config
    )

    return response.data
  } catch (error) {
    console.error('Error in addComment: ', error.response.data || error)
    throw error
  }
}

export default {
  getAll,
  setToken,
  create,
  update,
  deleteBLog,
  addComment,
  getComments,
}
