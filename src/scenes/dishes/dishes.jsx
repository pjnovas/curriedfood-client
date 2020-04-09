import React from 'react';

import { useRequestSWR } from 'hooks/service';
import LazyContent from 'components/lazy-content';
import DishList from './dish-list';

export const DishesScreen = () => (
  <LazyContent
    View={DishList}
    {...useRequestSWR(
      {
        url: '/dishes'
      },
      { withPlace: true }
    )}
  />
);
