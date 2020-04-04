import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { SafeAreaLayout, SaveAreaInset } from '../safe-area-layout';

const style = { flex: 1 };

jest.mock('react-native-safe-area-context');

useSafeArea.mockImplementation(() => ({
  top: 100,
  bottom: 50
}));

takeSnapshots(
  {
    default: {},
    withTop: {
      style,
      insets: SaveAreaInset.TOP,
      children: <View />
    },
    withBot: {
      style,
      insets: SaveAreaInset.BOTTOM,
      children: <View />
    }
  },
  SafeAreaLayout
);
