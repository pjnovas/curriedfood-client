import { noop } from 'lodash';

import reducer, {
  initialState,
  setId,
  setGroceries,
  clearStatus,
  setStatus
} from '../reducer';

jest.mock('axios');

describe('reducer', () => {
  test('returns an initial state', () => {
    expect(reducer(noop(), {})).toEqual(initialState);
  });

  test('allows to change current state', () => {
    expect(reducer(noop(), setStatus('loading'))).toEqual({
      ...initialState,
      status: 'loading'
    });
  });

  test('allows to clear current state', () => {
    expect(
      reducer(
        {
          ...initialState,
          id: 124,
          status: 'loading'
        },
        clearStatus()
      )
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        id: 124
      })
    );
  });

  test('allows to set a shopping list ID', () => {
    expect(
      reducer(
        {
          ...initialState,
          status: 'loading'
        },
        setId(123)
      )
    ).toEqual(
      expect.objectContaining({
        id: 123,
        status: 'loading'
      })
    );
  });

  test('allows to set groceries', () => {
    const groceries = [{ id: 1 }, { id: 2 }];
    expect(
      reducer(
        {
          ...initialState,
          id: 123
        },
        setGroceries(groceries)
      )
    ).toEqual(
      expect.objectContaining({
        id: 123,
        groceries
      })
    );
  });
});
