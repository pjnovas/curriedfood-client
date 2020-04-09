import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAB, List /*, Checkbox*/ } from 'react-native-paper';

import { AppRoute } from 'navigation/app-routes';
import { useNavigateTo } from 'hooks/navigation';
import { getText } from 'utils/grocery';
import { composeHooks } from 'utils/language';

export const ShopGroceryList = ({ data, openEdition, openNewItem }) => (
  <>
    <ScrollView>
      {data.map((item) => (
        <List.Item
          key={item.id}
          title={getText(item)}
          onPress={openEdition(item)}
          // right={() => (
          //   <Checkbox
          //   // status={checked ? 'checked' : 'unchecked'}
          //   // onPress={() => {
          //   //   this.setState({ checked: !checked });
          //   // }}
          //   />
          // )}
        />
      ))}
    </ScrollView>
    <FAB style={styles.fab} icon="plus" onPress={openNewItem} />
  </>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export const useNavigation = () => {
  const editIngredient = useNavigateTo(AppRoute.GROCERIES_EDIT);
  const newIngredient = useNavigateTo(AppRoute.GROCERIES_NEW);

  return {
    openEdition: (item) => () =>
      editIngredient({ id: item.id, title: item.product.name }),
    openNewItem: () => newIngredient()
  };
};

export default composeHooks({ useNavigation })(ShopGroceryList);
