import { useMarket } from 'hooks/market';
import { ConfirmDialog, useConfirm } from '../confirm-dialog';

jest.mock('hooks/market');

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
    withIngredients: {
      ingredients
    },
    loading: {
      ingredients,
      loading: true
    }
  },
  ConfirmDialog
);

describe('useConfirm', () => {
  const addFrom = jest.fn();
  const mockMarket = (status) => {
    useMarket.mockImplementation(() => [{ status }, { addFrom }]);
  };

  beforeEach(() => {
    addFrom.mockClear();
    useMarket.mockReset();
  });

  test('should return a default state', () => {
    mockMarket('idle');
    const result = useConfirm({ ingredients });

    expect(result).toEqual(
      expect.objectContaining({
        loading: false
      })
    );

    expect(addFrom).not.toBeCalled();
    result.onConfirm();
    expect(addFrom).toBeCalledWith(ingredients);
  });

  test('should return a loading state', () => {
    mockMarket('fetching');
    const result = useConfirm({ ingredients });

    expect(result).toEqual(
      expect.objectContaining({
        loading: true
      })
    );
  });
});
