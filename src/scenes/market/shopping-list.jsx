import React /*, { useCallback }*/ from 'react';
import ShopGroceriesList from './shop-grocery-list';
import { useAPI, extractData } from '../../hooks/service';
import { usePlace } from '../../context/auth-context';
import LazyContent from '../../components/lazy-content';
// import { useFocusEffect } from '@react-navigation/native';

const fromGroceries = extractData('data[0].groceries');

export const ShoppingListScreen = () => {
  const placeId = usePlace();
  const myShoppingList = useAPI(`shopping-lists?place=${placeId}`);

  // useFocusEffect(
  //   useCallback(() => {
  //     // TODO: re-fetch shopping list
  //   }, [])
  // );

  return (
    <LazyContent View={ShopGroceriesList} {...fromGroceries(myShoppingList)} />
  );
};
