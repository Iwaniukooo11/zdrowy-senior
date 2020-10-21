// Główny plik projektu, w którym importuję wszystkie screeny i tworzę na ich bazie działającą aplikację
import React from 'react'
import FlashMessage from 'react-native-flash-message'

import Home from './screens/home/home'
import Hand from './screens/hand/hand'
import Pills from './screens/pills/pills'
import Weather from './screens/weather/weather'
import Virus from './screens/virus/virus'
import Doctors from './screens/doctors/doctors'
import Critic from './screens/critic/critic'
import Bed from './screens/bed/bed'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

console.disableYellowBox = true

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Hand" component={Hand} />
          <Stack.Screen name="Bed" component={Bed} />
          <Stack.Screen name="Pills" component={Pills} />
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Virus" component={Virus} />
          <Stack.Screen name="Doctors" component={Doctors} />
          <Stack.Screen name="Critic" component={Critic} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" duration={3000} />
    </>
  )
}
