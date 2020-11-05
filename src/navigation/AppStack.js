
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RecipesListScreen } from "../screens/Recipes/RecipesListScreen";
import { DrawerContent } from '../components/DrawerContent';
import { AddRecipeScreen } from "../screens/Recipes/AddRecipeScreen";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Recipes" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Recipes" component={RecipesListScreen} />
      <Drawer.Screen name="AddRecipe" component={AddRecipeScreen} />
    </Drawer.Navigator>
  )
}