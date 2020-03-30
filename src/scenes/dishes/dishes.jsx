import React from 'react';
import DishList from './dish-list';
import { useAPI, extractData } from '../../hooks/service';
import LazyContent from '../../components/lazy-content';

export const DishesScreen = () => {
  const myDishes = useAPI(`dishes?place=1`);
  return <LazyContent View={DishList} {...extractData('data', myDishes)} />;
};
