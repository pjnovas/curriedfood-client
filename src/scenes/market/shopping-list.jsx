import React from 'react';
import GroceriesList from './grocery-list';
import { useMyShoppingList } from '../../service';
import LazyContent from '../../components/lazy-content';

export const ShoppingListScreen = () => (
  <LazyContent View={GroceriesList} {...useMyShoppingList()} />
);
