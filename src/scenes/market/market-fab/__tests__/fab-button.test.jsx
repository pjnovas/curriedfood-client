import * as React from 'react';
import { FabButton, useConfirm } from '../fab-button';

const ingredients = [
  {
    id: 1,
    quantity: 3,
    product: {
      name: 'Eggs',
      divisible: false,
      unit: 'un'
    }
  },
  {
    id: 2,
    quantity: 150,
    product: {
      name: 'Olives',
      divisible: true,
      unit: 'gr'
    }
  }
];

takeSnapshots(
  {
    default: {},
    'with ingredients': {
      ingredients
    },
    'ConfirmDialog when visible': {
      ingredients,
      visible: true
    }
  },
  FabButton
);

describe('useConfirm', () => {
  let spyUseState;
  const setVisible = jest.fn();
  const mockMarket = (visible) => {
    React.useState.mockImplementation(() => [visible, setVisible]);
  };

  beforeAll(() => {
    spyUseState = jest.spyOn(React, 'useState');
  });

  afterAll(() => {
    spyUseState.mockReset();
  });

  beforeEach(() => {
    setVisible.mockClear();
    React.useState.mockReset();
  });

  test('return a visible state', () => {
    mockMarket(true);
    expect(useConfirm()).toEqual(
      expect.objectContaining({
        visible: true
      })
    );

    mockMarket(false);
    expect(useConfirm()).toEqual(
      expect.objectContaining({
        visible: false
      })
    );
  });

  test('onDismiss allows to hide', () => {
    mockMarket();
    expect(setVisible).not.toBeCalled();
    useConfirm().onDismiss();
    expect(setVisible).toBeCalledWith(false);
  });

  test('onPress allows to show', () => {
    mockMarket();
    expect(setVisible).not.toBeCalled();
    useConfirm().onPress();
    expect(setVisible).toBeCalledWith(true);
  });
});
