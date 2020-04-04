import React from 'react';
import DishList from './dish-list';

import { useAPI, extractData } from 'hooks/service';
import LazyContent from 'components/lazy-content';
import { usePlace } from 'context/auth-context';

export const DishesScreen = () => {
  const placeId = usePlace();
  const myDishes = useAPI(`dishes?place=${placeId}`);
  return <LazyContent View={DishList} {...extractData('data', myDishes)} />;
};
