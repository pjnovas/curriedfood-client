import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { get, noop } from 'lodash';

import Theme from 'theme';
import { composeHooks } from 'utils/language';
import { useProductList } from 'hooks/products';
import Spinner from 'components/spinner';

export const ProductSelector = ({
  style,
  selected,
  loading,
  onPress,
  products
}) => (
  <ScrollView style={[styles.layout, style]}>
    {loading ? (
      <Spinner />
    ) : (
      products.map((item) => (
        <List.Item
          key={item.id}
          style={[
            styles.item,
            item.id === get(selected, 'id') ? styles.selected : null
          ]}
          title={item.name}
          onPress={() => onPress(item)}
        />
      ))
    )}
  </ScrollView>
);

ProductSelector.propTypes = {
  selected: PropTypes.object,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object)
};

ProductSelector.defaultProps = {
  onPress: noop,
  products: []
};

const styles = StyleSheet.create({
  layout: {},
  selected: {
    backgroundColor: Theme.colors.primary
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.divider
  }
});

export const useProducts = () => {
  const { data, loading } = useProductList();

  return {
    loading,
    products: data
  };
};

export default composeHooks({ useProducts })(ProductSelector);
