import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000';
const CLIENTS_URL = `${BACKEND_DOMAIN}/v1/clients/`;

const fetchClients = async () => {
  try {
    const response = await axios.get(CLIENTS_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch clients');
  }
};

const addClient = async (clientData) => {
  try {
    const response = await axios.post(CLIENTS_URL, clientData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add client');
  }
};

const editClient = async (clientId, clientData) => {
  try {
    const url = `${CLIENTS_URL}${clientId}/`;
    const response = await axios.put(url, clientData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit client');
  }
};

const deleteClient = async (clientId) => {
  try {
    const url = `${CLIENTS_URL}${clientId}/`;
    await axios.delete(url);
  } catch (error) {
    throw new Error('Failed to delete client');
  }
};

const clientService = {
    fetchClients,
    addClient,
    editClient,
    deleteClient,
};

export default clientService;