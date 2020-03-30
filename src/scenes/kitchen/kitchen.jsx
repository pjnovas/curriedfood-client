import React from 'react';
import GroceriesList from './grocery-list';
import { useAPI, extractData } from '../../hooks/service';
import LazyContent from '../../components/lazy-content';

const fromGroceries = extractData('data[0].groceries');

export const KitchenScreen = () => {
  const myGroceries = useAPI(`kitchens?place=1`);
  return <LazyContent View={GroceriesList} {...fromGroceries(myGroceries)} />;
};
