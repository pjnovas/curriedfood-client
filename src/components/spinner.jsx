import React from 'react';
import Theme from '../theme';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';

const Spinner = ({ bar }) =>
  bar ? (
    <ProgressBar animating indeterminate color={Theme.colors.primary} />
  ) : (
    <ActivityIndicator animating color={Theme.colors.primary} />
  );

export default Spinner;
