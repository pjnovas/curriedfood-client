import { noop } from 'lodash';
import { Chips, useFilter } from '../chips';

const list = ['almacen', 'super', 'verduleria', 'carniceria'];

const props = {
  list,
  onPress: noop
};

takeSnapshots(
  {
    default: props,
    withItems: {
      ...props,
      items: ['verduleria', 'super']
    }
  },
  Chips
);

describe('useFilter', () => {
  const value = 'verduleria,super,almacen';
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('translates a coma separated string into an array of items', () => {
    expect(useFilter({ value, onChange }).items).toEqual([
      'verduleria',
      'super',
      'almacen'
    ]);

    expect(useFilter({ onChange }).items).toEqual([]);
  });

  test('parses the list when an item is pressed', () => {
    const result = useFilter({ value, onChange });

    expect(result.items).toEqual(['verduleria', 'super', 'almacen']);

    result.onPress('super')(); // exists: removes it
    expect(onChange).toBeCalledWith('verduleria,almacen');

    result.onPress('carniceria')(); // does not exists: add it
    expect(onChange).toBeCalledWith('verduleria,super,almacen,carniceria');
  });
});
