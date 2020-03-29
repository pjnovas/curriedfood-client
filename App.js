import React from 'react';

import { mapping, dark as darkTheme } from '@eva-design/eva';
import { MaterialIconsPack } from './material-icon-pack';
import { default as appTheme } from './custom-theme.json';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './src/navigation/app';
import { AuthProvider } from './src/context/auth-context';

const theme = { ...darkTheme, ...appTheme };

export default () => (
  <>
    <IconRegistry icons={MaterialIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
);
