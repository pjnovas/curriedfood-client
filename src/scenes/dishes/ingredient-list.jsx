import React from 'react';
import { List, StyleService } from '@ui-kitten/components';
import IngredientListItem from './ingredient-list-item';

const IngredientList = (props) => (
  <List
    style={styles.list}
    renderItem={({ item }) => (
      <IngredientListItem style={styles.item} {...item} />
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

export default IngredientList;
