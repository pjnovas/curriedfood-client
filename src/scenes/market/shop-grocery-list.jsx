import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { AppRoute } from 'navigation/app-routes';
import { useNavigateTo } from 'hooks/navigation';
import { composeHooks } from 'utils/language';
import ProductTagsDialog from 'scenes/products/product-tags-dialog';
import IngredientList from './ingredients/list';
import { useShopping } from './context';

export const ShopGroceryList = ({
  onPressNewItem,
  productTagsEdition,
  onDismissProductTags,
  onChangeProductTags,
  onPressListItem
}) => (
  <>
    <IngredientList onPressListItem={onPressListItem} />

    <FAB style={styles.fab} icon="plus" onPress={onPressNewItem} />

    {productTagsEdition && (
      <ProductTagsDialog
        tagField="shop_tags"
        onDismiss={onDismissProductTags}
        onSubmit={onChangeProductTags}
        {...productTagsEdition}
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

export const useNavigation = () => {
  const newIngredient = useNavigateTo(AppRoute.GROCERIES_NEW);
  return {
    onPressNewItem: () => newIngredient()
  };
};

export default composeHooks({
  useNavigation,
  useProductTagEdition
})(ShopGroceryList);
