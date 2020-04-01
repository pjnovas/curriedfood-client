import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from './icon';
import Theme from '../theme';

const IconData = ({ icon, text, reverse, children, ...props }) => (
  <View style={[styles.layout, reverse ? styles.layReverse : {}]} {...props}>
    <Icon
      style={styles.icon}
      name={icon}
      color={Theme.colors.disabled}
      size={20}
    />
    {children || <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  layReverse: {
    flexDirection: 'row-reverse'
  },
  icon: {
    marginHorizontal: 5
  },
  text: {
    color: Theme.colors.disabled
  }
});

export default IconData;
