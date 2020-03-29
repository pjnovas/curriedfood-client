import React from 'react';
import { List, StyleService } from '@ui-kitten/components';
import GroceryListItem from './grocery-list-item';

const GroceryList = (props) => (
  <List
    style={styles.list}
    renderItem={({ item }) => <GroceryListItem style={styles.item} {...item} />}
    {...props}
  />
);

const styles = StyleService.create({
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  }
});

export default GroceryList;
