
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import RecipesListScreen from "../screens/Recipes/RecipesListScreen";
import { DrawerContent } from '../components/DrawerContent';
import { AddRecipeScreen } from "../screens/Recipes/AddRecipeScreen";
import { EditRecipeScreen } from "../screens/Recipes/EditRecipeScreen";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Recipes" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Recipes" component={RecipesListScreen} />
      <Drawer.Screen name="AddRecipe" component={AddRecipeScreen} />
      <Drawer.Screen name="EditRecipe" component={EditRecipeScreen} />
    </Drawer.Navigator>
  )
}