import * as React from 'react';
import { noop } from 'lodash';
import { Chips, useFilter } from '../chips';

const list = ['almacen', 'super', 'verduleria', 'carniceria'];

const props = {
  allItems: list,
  onPress: noop
};

takeSnapshots(
  {
    default: props,
    withItems: {
      ...props,
      items: ['verduleria', 'super']
    },
    withNews: {
      ...props,
      items: ['verduleria', 'super', 'newItem'],
      newValue: 'other-new',
      allowNew: true
    }
  },
  Chips
);

describe('useFilter', () => {
  const value = 'verduleria,super,almacen';
  const onChange = jest.fn();
  const setValue = jest.fn();
  let spyUseState = jest.spyOn(React, 'useState');

  const mockUseState = (text) => {
    React.useState.mockImplementation(() => [text, setValue]);
  };

  beforeEach(() => {
    mockUseState('');
    spyUseState = jest.spyOn(React, 'useState');
  });

  afterEach(() => {
    spyUseState.mockReset();
    onChange.mockClear();
  });

  test('translates a comma separated string into an array of items', () => {
    const result = useFilter({ list, value, onChange });

    expect(result.allItems).toEqual(list);

    expect(result.items).toEqual(['verduleria', 'super', 'almacen']);

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

  test('manages new items', () => {
    mockUseState('other');
    const result = useFilter({ list, value: `${value},newItem`, onChange });
    expect(result.items).toEqual(['verduleria', 'super', 'almacen', 'newItem']);

    expect(result.allItems).toEqual([
      'almacen',
      'super',
      'verduleria',
      'carniceria',
      'newItem'
    ]);

    expect(result.newValue).toEqual('other');

    result.onChangeText('otherItem');
    expect(setValue).toBeCalledWith('otherItem');
    expect(onChange).not.toBeCalled();

    result.onNew();
    expect(setValue).toBeCalledWith('');
    expect(onChange).toBeCalledWith(`${value},newItem,${result.newValue}`);
  });
});
