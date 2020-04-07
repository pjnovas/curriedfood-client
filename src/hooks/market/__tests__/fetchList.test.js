import { setId, setGroceries, setStatus, clearStatus } from '../reducer';
import fetchList from '../fetchList';

jest.mock('axios');

describe('fetchList', () => {
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

  test('fetch and fill the current cart list', async () => {
    const id = 1001;
    const groceries = [{ id: 1 }, { id: 2 }];
    ctx.request.mockResolvedValue({ data: [{ id, groceries }] });

    await fetchList(ctx)();
    const calls = ctx.dispatch.mock.calls;

    expect(calls[0][0]).toEqual(setStatus('fetching'));

    expect(ctx.request).toBeCalledWith({
      url: '/shopping-lists',
      method: 'get'
    });

    expect(calls[1][0]).toEqual(setId(id));
    expect(calls[2][0]).toEqual(setGroceries(groceries));
    expect(calls[3][0]).toEqual(clearStatus());
  });
});
