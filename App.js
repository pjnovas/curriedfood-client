import React, { Component } from 'react';

import { mapping, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as appTheme } from './custom-theme.json';
import { AppNavigator } from './src/navigation';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

const theme = { ...darkTheme, ...appTheme };

export default class App extends Component {
  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <AppNavigator />
        </ApplicationProvider>
      </>
    );
  }
}
