import React from 'react';

import LazyContent from 'components/lazy-content';
import { ShoppingProvider, useShopping } from './context';
import ShopGroceriesList from './shop-grocery-list';

export const ListScene = () => {
  const result = useShopping();
  return <LazyContent View={ShopGroceriesList} {...result} />;
};

export const ShoppingListScreen = () => (
  <ShoppingProvider>
    <ListScene />
  </ShoppingProvider>
);

export default ShoppingListScreen;
