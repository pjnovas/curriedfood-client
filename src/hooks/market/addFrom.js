import get from 'lodash/get';
import find from 'lodash/find';
import flow from 'lodash/flow';
import map from 'lodash/fp/map';

import { AppRoute } from 'navigation/app-routes';
import fetchList from './fetchList';
import { setGroceries, setStatus, clearStatus } from './reducer';

const sumQuantity = (items) => ({ product, quantity, ...item }) => ({
  ...item,
  product,
  quantity:
    Number(get(find(items, ['product.id', product.id]), 'quantity', 0)) +
    Number(quantity)
});

const appendNewOnes = (all) => (newOnes, item) =>
  find(all, ['product.id', item.product.id])
    ? newOnes
    : [
        ...newOnes,
        {
          quantity: item.quantity,
          product: item.product.id
        }
      ];

export default (context) => async (items) => {
  const { id, groceries } = await fetchList(context)();
  const { dispatch, request, navigation } = context;

  dispatch(setStatus('saving'));

  const updatedItems = flow(map(sumQuantity(items)), (sum) => [
    ...sum,
    ...items.reduce(appendNewOnes(sum), [])
  ])(groceries);

  const { data } = await request({
    url: `/shopping-lists/${id}`,
    method: 'put',
    data: {
      groceries: updatedItems
    }
  });

  dispatch(setGroceries(data.groceries));
  dispatch(clearStatus());

  navigation.navigate(AppRoute.MARKET);
};
