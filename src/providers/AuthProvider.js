import React, { useState } from 'react';
import {modelName} from 'expo-device';
import * as Storage from '../services/storage'
import api, {setClientToken} from '../services/api'

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        register: (data) => {
          api.post('/api/register/', data)
          .then(response => {
            setError(null);
            Storage.setKey('token', {"token": response.data.token})
            setToken(response.data.token)
            setUser(response.data.user)
            setClientToken(response.data.token)
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        login: (email, password) => {
          api.post('/api/login', {
            email,
            password,
            device_name: modelName ?? 'mobile',
          })
          .then(response => {
            setError(null);
            Storage.setKey('token', {"token": response.data.token})
            setToken(response.data.token)
            setUser(response.data.user)
            setClientToken(response.data.token)
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        logout: () => {
          // alert(token)
          // setClientToken(token)
          api.post('/api/logout')
          .then(response => {
            setUser(null);
            setToken(null)
            Storage.deleteKey('token')
            setClientToken("")
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