
import React, { useContext, useState, useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "./../providers/AuthProvider";
import { Button, Text, View } from "react-native";
import { RecipesList } from "../screens/Recipes/RecipesList";

// const Stack = createStackNavigator();

// function DashboardScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext)
//   const [name, setName] = useState(null);

//   useEffect(() => {
//     // console.log(user)
//     // alert(user.email)
//   }, [])


//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Dashboard Screen Logged In View</Text>
//       <Text>User: {user.email}</Text>
//       <Text>User from Server: {name}</Text>
//       <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
//       <Text>User from Server: {name}</Text>
//       <Button title="Logout" onPress={() => logout()} />
//     </View>
//   );
// }

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
        <Drawer.Screen name="recipes" options={{ title: 'Recipes' }} component={RecipesList} />
        <Drawer.Screen name="logout" component={logoutScreen} />
      </Drawer.Navigator>
    // <Stack.Navigator>
    //   <Stack.Screen name="recipes" options={{ title: 'Recipes' }} component={RecipesList} />
    //   {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    // </Stack.Navigator>
  )
}