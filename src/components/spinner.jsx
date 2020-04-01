import React from 'react';
import Theme from '../theme';
import { ActivityIndicator } from 'react-native-paper';

const Spinner = () => (
  <ActivityIndicator animating color={Theme.colors.primary} />
);

export default Spinner;
