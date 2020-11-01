import React from 'react'
import 'react-native-gesture-handler'
import {AuthProvider} from './src/providers/AuthProvider'
import {Routes} from './src/providers/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
