import axios from 'axios';

// Create axios client, pre-configured with baseURL
let api = axios.create({
  baseURL: 'https://recipes.michaelvanolst.dev',
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


export default api;