import React from 'react';

import { mapping, dark as darkTheme } from '@eva-design/eva';
import { MaterialIconsPack } from './material-icon-pack';
import { default as appTheme } from './custom-theme.json';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './src/theme';
import { AppNavigator } from './src/navigation/app';
import { AuthProvider } from './src/context/auth-context';
import ErrorBoundary from './src/components/error-boundary';

const themeOLD = { ...darkTheme, ...appTheme };

export default () => (
  <>
    <IconRegistry icons={MaterialIconsPack} />
    <ApplicationProvider mapping={mapping} theme={themeOLD}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <ErrorBoundary>
            <NavigationContainer>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </NavigationContainer>
          </ErrorBoundary>
        </SafeAreaProvider>
      </PaperProvider>
    </ApplicationProvider>
  </>
);
