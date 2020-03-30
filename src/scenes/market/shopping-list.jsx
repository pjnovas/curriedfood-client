import React from 'react';
import ShopGroceriesList from './shop-grocery-list';
import { useAPI, extractData } from '../../hooks/service';
import LazyContent from '../../components/lazy-content';

const fromGroceries = extractData('data[0].groceries');

export const ShoppingListScreen = () => {
  const myShoppingList = useAPI(`shopping-lists?place=1`);
  return (
    <LazyContent View={ShopGroceriesList} {...fromGroceries(myShoppingList)} />
  );
};
