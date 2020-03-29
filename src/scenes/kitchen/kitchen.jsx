import React from 'react';
import GroceriesList from './grocery-list';
import { useMyGroceries } from '../../service';
import LazyContent from '../../components/lazy-content';

export const KitchenScreen = () => (
  <LazyContent View={GroceriesList} {...useMyGroceries()} />
);
