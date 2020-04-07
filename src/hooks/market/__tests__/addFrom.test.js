import { AppRoute } from 'navigation/app-routes';
import { initialState, setGroceries, setStatus, clearStatus } from '../reducer';

import fetchList from '../fetchList';
import addFrom from '../addFrom';

jest.mock('../fetchList', () => jest.fn());

describe('addFrom', () => {
  const ctx = {
    getState: jest.fn(),
    dispatch: jest.fn(),
    request: jest.fn(),
    navigation: {
      navigate: jest.fn()
    }
  };

  const clearContext = () => {
    ctx.getState.mockClear();
    ctx.dispatch.mockClear();
    ctx.request.mockClear();
    ctx.navigation.navigate.mockClear();
  };

  beforeEach(clearContext);

  test('fetch the current list, merge with new one and update it', async () => {
    const id = 1002;
    const groceries = [
      {
        id: 1,
        quantity: 3,
        product: {
          id: 10,
          name: 'Eggs',
          divisible: false,
          unit: 'un'
        }
      },
      {
        id: 2,
        quantity: 150,
        product: {
          id: 20,
          name: 'Olives',
          divisible: true,
          unit: 'gr'
        }
      },
      {
        id: 3,
        quantity: 1000,
        product: {
          id: 100,
          name: 'Milk',
          divisible: true,
          unit: 'lt'
        }
      }
    ];

    const newItems = [
      {
        // UPDATE Item
        id: 60,
        quantity: 2,
        product: groceries[0].product
      },
      {
        // UPDATE Item
        id: 2,
        quantity: 200,
        product: groceries[1].product
      },
      {
        // NEW Item
        id: 80,
        quantity: 10,
        product: {
          id: 30,
          name: 'Salt',
          divisible: true,
          unit: 'gr'
        }
      }
    ];

    const expectedItems = [
      {
        ...groceries[0],
        quantity: 5
      },
      {
        ...groceries[1],
        quantity: 350
      },
      groceries[2],
      {
        quantity: newItems[2].quantity,
        product: newItems[2].product.id
      }
    ];

    const cart = { id, groceries };
    const updatedCart = { id, groceries: expectedItems };

    // TODO: getState() has not the latest state
    // ctx.getState.mockImplementation(() => ({
    //   ...initialState,
    //   ...cart
    // }));

    fetchList.mockImplementation(() => jest.fn(() => Promise.resolve(cart)));

    ctx.request.mockResolvedValue({ data: updatedCart });

    await addFrom(ctx)(newItems);

    expect(ctx.request).toBeCalledWith({
      url: `/shopping-lists/${id}`,
      method: 'put',
      data: { groceries: expectedItems }
    });

    expect(ctx.dispatch.mock.calls).toEqual([
      [setStatus('saving')],
      [setGroceries(expectedItems)],
      [clearStatus()]
    ]);

    expect(ctx.navigation.navigate).toBeCalledWith(AppRoute.MARKET);
  });
});
