import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const create = (newContact) => {
  const request = axios.post(`${baseUrl}`, newContact);
  return request.then((response) => response.data);
};

export default { getAll, create, deleteContact, update };
