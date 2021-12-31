import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/components/Navigation';
import {primary} from './src/screens/colors';
import {AuthProvider} from './src/screens/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={primary} />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
