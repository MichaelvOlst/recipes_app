import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { AuthStack } from './../navigation/AuthStack';
import { AppStack } from './../navigation/AppStack';
import * as Storage from '../services/storage'
import api, {setClientToken} from '../services/api'
import { Loading } from "../components/Loading";

export const Routes = () => {
  const { user, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Storage.getKey('token')
      .then(tokenString => {
        if (tokenString) {
          const token = JSON.parse(tokenString)
          setClientToken(token.token)
          api.get('/api/user/me/')
          .then(response => {
            // setTimeout(() => {
              setUser(response.data);
              setLoading(false);
            // }, 1000)
          })
          .catch(error => {
            setLoading(false);
            console.log(error.response)
          })
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        // alert(err)
        setLoading(false)
      })
  }, []);

  if (loading) {
    return (
      <Loading/>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}