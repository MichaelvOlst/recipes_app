
import React, { useContext, useEffect } from "react";
import {View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from "./../providers/AuthProvider";
import { RecipesListScreen } from "../screens/Recipes/RecipesListScreen";


function logoutScreen({ navigation }) {
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    logout()
    navigation.navigate("login")
  }, [])

  return null
}


const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="recipes">
      <Drawer.Screen name="recipes" options={{ drawerLabel: 'Recipes' }} component={RecipesListScreen} />
      <Drawer.Screen name="logout" options={{ drawerLabel: 'Logout' }} component={logoutScreen} />
    </Drawer.Navigator>
  )
}