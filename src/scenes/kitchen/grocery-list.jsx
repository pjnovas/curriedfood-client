import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { getText } from 'utils/grocery';

const GroceryList = (props) => (
  <ScrollView>
    {props.data.map((item) => (
      <List.Item
        key={item.id}
        title={getText(item)}
        // TODO: Expiration - right={() => <DishDuration duration={dish.duration} />}
      />
    ))}
  </ScrollView>
);

export default GroceryList;
