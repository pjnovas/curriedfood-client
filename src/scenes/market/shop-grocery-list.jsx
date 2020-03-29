import React from 'react';
import { List, StyleService } from '@ui-kitten/components';
import ShopGroceryListItem from './shop-grocery-list-item';

const ShopGroceryList = (props) => (
  <List
    style={styles.list}
    renderItem={({ item }) => (
      <ShopGroceryListItem style={styles.item} {...item} />
    )}
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

export default ShopGroceryList;
