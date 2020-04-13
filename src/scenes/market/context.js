import React from 'react';
import { get } from 'lodash';

import { useRequest, useRequestSWR } from 'hooks/service';

const ShoppingContext = React.createContext();

const getUri = (id) => `/shopping-lists/${id || ''}`;

const useUpdate = ({ data, revalidate }) => {
  const request = useRequest();

  return async (groceries) => {
    await request({
      url: getUri(data.id),
      method: 'put',
      data: {
        groceries
      }
    });

    revalidate();
  };
};

const ShoppingProvider = ({ children }) => {
  const value = useRequestSWR({ url: getUri() }, { withPlace: true });
  const data = get(value, 'data[0]') || null;
  const update = useUpdate({ ...value, data });

  const parsed = {
    ...value,
    update,
    data,
    mutate: (groceries) => {
      value.mutate({
        ...data,
        groceries
      });
    }
  };

  return (
    <ShoppingContext.Provider value={parsed}>
      {children}
    </ShoppingContext.Provider>
  );
};

const useShopping = () => {
  const context = React.useContext(ShoppingContext);

  if (context === undefined) {
    throw new Error(`useShopping must be used within a ShoppingProvider`);
  }

  return context;
};

export { ShoppingProvider, useShopping };
