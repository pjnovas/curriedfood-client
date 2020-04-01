import React from 'react';
import { View, StyleSheet } from 'react-native';
import Theme from '../theme';

const Layout = ({ children, style, ...props }) => (
  <View {...props} style={[styles.layout, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: Theme.colors.background
  }
});

export default Layout;
