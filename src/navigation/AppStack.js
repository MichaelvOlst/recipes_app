
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import RecipesListScreen from "../screens/Recipes/RecipesListScreen";
import { DrawerContent } from '../components/DrawerContent';
import { AddRecipeScreen } from "../screens/Recipes/AddRecipeScreen";
import { EditRecipeScreen } from "../screens/Recipes/EditRecipeScreen";
import CategoriesListScreen from "../screens/Categories/CategoriesListScreen";
import { EditCategoryScreen } from "../screens/Categories/EditCategoryScreen";
import { AddCategoryScreen } from "../screens/Categories/AddCategoryScreen";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Categories" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Recipes" options={{ headerShown: false }} component={RecipesListScreen} />
      <Drawer.Screen name="AddRecipe" options={{ headerShown: false }} component={AddRecipeScreen} />
      <Drawer.Screen name="EditRecipe" options={{ headerShown: false }} component={EditRecipeScreen} />
      <Drawer.Screen name="Categories" options={{ headerShown: false }} component={CategoriesListScreen} />
      <Drawer.Screen name="AddCategory" options={{ headerShown: false }} component={AddCategoryScreen} />
      <Drawer.Screen name="EditCategory" options={{ headerShown: false }} component={EditCategoryScreen} />

    </Drawer.Navigator>
  )
}