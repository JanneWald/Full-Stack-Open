import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response;
};

export default { getAll, getOne };
