import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'context/auth-context';

import { AuthNavigator } from './auth';
import { HomeNavigator } from './home';
import { AppRoute } from './app-routes';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const [state] = useAuth();

  return (
    <Stack.Navigator headerMode="none">
      {!state.jwt ? (
        <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      ) : (
        <Stack.Screen name={AppRoute.HOME} component={HomeNavigator} />
      )}
    </Stack.Navigator>
  );
};
