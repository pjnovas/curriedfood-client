import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth';
import { HomeNavigator } from './home';
import { AppRoute } from './app-routes';

const Stack = createStackNavigator();

export const AppNavigator = (props) => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    <Stack.Screen name={AppRoute.HOME} component={HomeNavigator} />
  </Stack.Navigator>
);
