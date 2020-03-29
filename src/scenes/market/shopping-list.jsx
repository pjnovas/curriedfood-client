import React from 'react';
import ShopGroceriesList from './shop-grocery-list';
import { useMyShoppingList } from '../../service';
import LazyContent from '../../components/lazy-content';

export const ShoppingListScreen = () => (
  <LazyContent View={ShopGroceriesList} {...useMyShoppingList()} />
);
