import React from 'react';
import { ScrollView } from 'react-native';
import { List, Checkbox } from 'react-native-paper';
import { getText } from '../../utils/grocery';

const ShopGroceryList = (props) => (
  <ScrollView>
    {props.data.map((item) => (
      <List.Item
        key={item.id}
        title={getText(item)}
        right={() => (
          <Checkbox
          // status={checked ? 'checked' : 'unchecked'}
          // onPress={() => {
          //   this.setState({ checked: !checked });
          // }}
          />
        )}
      />
    ))}
  </ScrollView>
);

export default ShopGroceryList;
