import React from 'react';
import GroceriesList from './grocery-list';
import { useAPI, extractData } from 'hooks/service';
import { usePlace } from 'context/auth-context';
import LazyContent from 'components/lazy-content';

const fromGroceries = extractData('data[0].groceries');

export const KitchenScreen = () => {
  const placeId = usePlace();
  const myGroceries = useAPI(`kitchens?place=${placeId}`);
  return <LazyContent View={GroceriesList} {...fromGroceries(myGroceries)} />;
};
