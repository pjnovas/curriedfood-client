import React from 'react';
import DishList from './dish-list';
import { useMyDishes } from '../../service';
import LazyContent from '../../components/lazy-content';

export const DishesScreen = () => (
  <LazyContent View={DishList} {...useMyDishes()} />
);
