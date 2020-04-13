import React from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';

import { longName, convert } from 'utils/grocery';
import NumericInput from './numeric-input';

export const IngredientItem = ({ onPress, onRemove, onChange, ...item }) => (
  <List.Item
    style={styles.layout}
    title={item.product.name}
    description={longName[item.product.unit]}
    onPress={onPress}
    left={(props) => (
      <NumericInput
        {...props}
        onChangeValue={onChange}
        defaultValue={convert(item.quantity)}
      />
    )}
    right={(props) => <IconButton {...props} icon="close" onPress={onRemove} />}
  />
);

const styles = StyleSheet.create({
  layout: {
    borderBottomWidth: 1,
    borderBottomColor: '#112222'
  }
});

export default IngredientItem;
