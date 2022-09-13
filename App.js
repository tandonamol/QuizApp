import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import Nav from './Nav';

export default function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}
