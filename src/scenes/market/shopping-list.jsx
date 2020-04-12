import React from 'react';
import { get } from 'lodash';

import { useRequestSWR } from 'hooks/service';
import LazyContent from 'components/lazy-content';
import ShopGroceriesList from './shop-grocery-list';

export const ShoppingListScreen = () => {
  const result = useRequestSWR(
    {
      url: '/shopping-lists'
    },
    { withPlace: true }
  );

  return (
    <LazyContent
      View={ShopGroceriesList}
      {...{ ...result, data: get(result, 'data[0].groceries') }}
    />
  );
};
