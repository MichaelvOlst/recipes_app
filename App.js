import React from 'react'
import 'react-native-gesture-handler'
import {AuthProvider} from './src/providers/AuthProvider'
import {Routes} from './src/providers/Routes'
// import { AppLoading } from 'expo';
// import {
//   useFonts,
//   Inter_900Black,
// } from '@expo-google-fonts/inter';

const App = () => {

  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
