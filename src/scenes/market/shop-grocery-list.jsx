import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { composeHooks } from 'utils/language';
import ProductTagsDialog from 'scenes/products/product-tags-dialog';
import IngredientList from './ingredients/list';
import CreateIngredientDialog from './ingredients/create';
import { useShopping } from './context';

export const ShopGroceryList = ({
  onPressNewItem,
  showNewIngredient,
  onDismissCreateIngredient,
  onCreateIngredient,

  productTagsEdition,
  onDismissProductTags,
  onChangeProductTags,
  onPressListItem
}) => (
  <>
    <IngredientList onPressListItem={onPressListItem} />
    {productTagsEdition && (
      <ProductTagsDialog
        tagField="shop_tags"
        onDismiss={onDismissProductTags}
        onSubmit={onChangeProductTags}
        {...productTagsEdition}
      />
    )}

    <FAB style={styles.fab} icon="plus" onPress={onPressNewItem} />
    {showNewIngredient && (
      <CreateIngredientDialog
        onDismiss={onDismissCreateIngredient}
        onSubmit={onCreateIngredient}
      />
    )}
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

export const useProductTagEdition = () => {
  const { revalidate } = useShopping();
  const [productTagsEdition, setVisibleEdit] = useState();

  return {
    productTagsEdition,
    onPressListItem: (item) => () => setVisibleEdit({ product: item.product }),
    onDismissProductTags: () => setVisibleEdit(),
    onChangeProductTags: () => {
      setVisibleEdit();
      revalidate();
    }
  };
};

export const useCreateIngredient = () => {
  const { data, update, revalidate } = useShopping();
  const [showNewIngredient, setVisibleNew] = useState(false);

  return {
    showNewIngredient,
    onPressNewItem: () => setVisibleNew(true),
    onDismissCreateIngredient: () => setVisibleNew(false),
    onCreateIngredient: async (newItem) => {
      await update([...data.groceries, newItem]);
      setVisibleNew(false);
      revalidate();
    }
  };
};

export default composeHooks({
  useCreateIngredient,
  useProductTagEdition
})(ShopGroceryList);
