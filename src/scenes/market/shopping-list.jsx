import React from 'react';
import ShopGroceriesList from './shop-grocery-list';
import { useAPI, extractData } from '../../hooks/service';
import { usePlace } from '../../context/auth-context';
import LazyContent from '../../components/lazy-content';

const fromGroceries = extractData('data[0].groceries');

export const ShoppingListScreen = () => {
  const placeId = usePlace();
  const myShoppingList = useAPI(`shopping-lists?place=${placeId}`);
  return (
    <LazyContent View={ShopGroceriesList} {...fromGroceries(myShoppingList)} />
  );
};
