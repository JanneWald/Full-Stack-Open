import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const replaceBlog = async (blogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    config
  );
  return response.data;
};

const deleteBlog = async (blogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config);
  return response.data;
};

const commentOnBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: comment,
  });
  return response.data;
};

export default {
  getAll,
  setToken,
  addBlog,
  replaceBlog,
  deleteBlog,
  commentOnBlog,
};
