import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

axios.defaults.baseURL = 'https://recipes.michaelvanolst.dev';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        register: (data) => {
          axios.post('/api/register/', data)
          .then(response => {
            const userResponse = {
              token: response.data.token,
            }
            setUser(userResponse);
            setError(null);
          })
          .catch(error => {
            // console.log(error)
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        login: (email, password) => {
          axios.post('/api/login', {
            email,
            password,
            device_name: 'mobile',
          })
          .then(response => {
            const userResponse = {
              token: response.data.token,
            }
            setUser(userResponse);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          axios.post('/api/logout')
          .then(response => {
            setUser(null);
            SecureStore.deleteItemAsync('user')
          })
          .catch(error => {
            console.log(error.response);
          })
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}