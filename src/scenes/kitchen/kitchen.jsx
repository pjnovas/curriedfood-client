import React from 'react';
import get from 'lodash/get';

import { useRequestSWR } from 'hooks/service';
import LazyContent from 'components/lazy-content';
import GroceriesList from './grocery-list';

export const KitchenScreen = () => {
  const result = useRequestSWR(
    {
      url: '/kitchens'
    },
    { withPlace: true }
  );

  return (
    <LazyContent
      View={GroceriesList}
      {...{ ...result, data: get(result, 'data[0].groceries') }}
    />
  );
};
