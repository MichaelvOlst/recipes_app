
import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from '../screens/Auth/RegistrationScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" options={{ title: 'Login' }} component={LoginScreen} />
      <Stack.Screen name="registration" options={{ title: 'Registration' }} component={RegistrationScreen} />
    </Stack.Navigator>
  )
}