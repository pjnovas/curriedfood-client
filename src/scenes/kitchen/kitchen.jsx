import React from 'react';
import GroceriesList from './grocery-list';
import { useMyGroseries } from '../../service';
import LazyContent from '../../components/lazy-content';

export const KitchenScreen = () => (
  <LazyContent View={GroceriesList} {...useMyGroseries()} />
);
