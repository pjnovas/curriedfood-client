import React, { Fragment, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAB, List, TextInput, IconButton, Divider } from 'react-native-paper';
import { isEmpty, includes, uniq, compact, sortBy, mapValues } from 'lodash';

import { AppRoute } from 'navigation/app-routes';
import { useNavigateTo } from 'hooks/navigation';
import { longName, convert } from 'utils/grocery';
import { composeHooks } from 'utils/language';
import ProductTagsDialog from 'scenes/products/product-tags-dialog';

export const ShopGroceryList = ({
  showEditItem,
  openNewItem,
  reload,
  closeEdit,
  openEdition,
  categories
}) => (
  <>
    <ScrollView contentContainerStyle={styles.layout}>
      {Object.keys(categories).map((key) => (
        <List.Section key={key}>
          <List.Subheader style={styles.sectionTitle}>{key}</List.Subheader>
          {categories[key].map((item) => (
            <Fragment key={item.id}>
              <List.Item
                key={item.id}
                title={item.product.name}
                description={longName[item.product.unit]}
                onPress={openEdition(item.product)}
                left={(props) => (
                  <TextInput
                    {...props}
                    selectTextOnFocus
                    style={styles.quantity}
                    defaultValue={convert(item.quantity)}
                    mode="outlined"
                    keyboardType="numeric"
                    textAlign="right"
                    maxLength={20}
                    dense
                  />
                )}
                right={(props) => <IconButton {...props} icon="close" />}
              />
              <Divider />
            </Fragment>
          ))}
        </List.Section>
      ))}
    </ScrollView>

    <FAB style={styles.fab} icon="plus" onPress={openNewItem} />
    {showEditItem && (
      <ProductTagsDialog
        tagField="shop_tags"
        onDismiss={closeEdit}
        onSubmit={() => {
          reload();
          closeEdit();
        }}
        {...showEditItem}
      />
    )}
  </>
);

const styles = StyleSheet.create({
  layout: {
    paddingBottom: 80
  },
  sectionTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    alignSelf: 'center'
  },
  quantity: {
    width: 80
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export const useNavigation = ({ data }) => {
  const newIngredient = useNavigateTo(AppRoute.GROCERIES_NEW);
  const [showEditItem, setVisibleEdit] = useState();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const tags = compact(
      uniq(
        data.reduce(
          (all, item) => [
            ...all,
            ...(item?.product.shop_tags || '').split(',')
          ],
          []
        )
      )
    );

    tags.sort();

    let resolved = tags.reduce(
      (all, tag) => ({
        ...all,
        [tag]: data.filter((item) => includes(item.product.shop_tags, tag))
      }),
      {
        'sin categoria': data.filter((item) => isEmpty(item.product.shop_tags))
      }
    );

    setCategories(
      mapValues(resolved, (item) => sortBy(item, ({ product }) => product.name))
    );
  }, [data]);

  return {
    openNewItem: () => newIngredient(),
    openEdition: (product) => () =>
      setVisibleEdit({
        product,
        allTags:
          Object.keys(categories).filter((key) => key !== 'sin categoria') || []
      }),
    closeEdit: () => setVisibleEdit(),
    reload: () => {
      // TODO: re fetch to remap categories
    },
    showEditItem,
    categories
  };
};

export default composeHooks({ useNavigation })(ShopGroceryList);
