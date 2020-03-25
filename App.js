import React from 'react';

import { mapping, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as appTheme } from './custom-theme.json';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './src/navigation/app.navigator';
import { AppRoute } from './src/navigation/app-routes';

const theme = { ...darkTheme, ...appTheme };

export default () => {
  const isAuthorized = true;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator
              initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}
            />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};
