import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './src/theme';
import { AppNavigator } from './src/navigation/app';
import { AuthProvider } from './src/context/auth-context';
import ErrorBoundary from './src/components/error-boundary';

export default () => (
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
);
