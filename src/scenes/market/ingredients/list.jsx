import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { get } from 'lodash';

import { composeHooks } from 'utils/language';
import { groupByShopTags } from 'utils/grocery';

import { useShopping } from '../context';
import IngredientItem from './item';

export const IngredientList = ({
  onPressListItem,
  onRemoveListItem,
  onChangeListItem,
  categories
}) => (
  <ScrollView contentContainerStyle={styles.layout}>
    {Object.keys(categories).map((key) => (
      <List.Section key={key}>
        <List.Subheader style={styles.sectionTitle}>{key}</List.Subheader>
        {categories[key].map((item) => (
          <IngredientItem
            key={`${key}-${item.id}`}
            onPress={onPressListItem(item)}
            onRemove={onRemoveListItem(item)}
            onChange={onChangeListItem(item)}
            {...item}
          />
        ))}
      </List.Section>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  layout: {
    paddingBottom: 80
  },
  sectionTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    alignSelf: 'center'
  }
});

const useTags = () => {
  const value = useShopping();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const data = get(value, 'data.groceries', []);
    setCategories(groupByShopTags(data));
  }, [value]);

  return {
    categories
  };
};

export const useIngredientList = () => {
  const { data, update } = useShopping();

  return {
    onRemoveListItem: (item) => () => {
      update(data.groceries.filter(({ id }) => item.id !== id));
    },
    onChangeListItem: (item) => (quantity) => {
      update(
        data.groceries.map((currItem) =>
          item.id !== currItem.id
            ? currItem
            : {
                ...currItem,
                quantity
              }
        )
      );
    }
  };
};

export default composeHooks({
  useTags,
  useIngredientList
})(IngredientList);
