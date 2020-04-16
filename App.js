import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Portal } from 'react-native-paper';

import theme from 'theme';
import { AppNavigator } from 'navigation/app';
import { AuthProvider } from 'context/auth-context';
import ErrorBoundary from 'components/error-boundary';

export default () => (
  <PaperProvider theme={theme}>
    <SafeAreaProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <AuthProvider>
            <Portal.Host>
              <AppNavigator />
            </Portal.Host>
          </AuthProvider>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  </PaperProvider>
);
