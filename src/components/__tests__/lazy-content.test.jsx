import * as React from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { LazyContent, useFocus } from '../lazy-content';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn()
}));

takeSnapshots(
  {
    default: {},
    loading: {
      showActivity: true
    },
    withError: {
      isLoading: false,
      error: 'Boom!'
    },
    withData: {
      isLoading: false,
      View,
      data: ['a', 'b', 'c']
    }
  },
  LazyContent
);

describe('useFocus', () => {
  let spyUseCallback;
  beforeAll(() => {
    spyUseCallback = jest.spyOn(React, 'useCallback');
    React.useCallback.mockImplementation();
  });

  afterAll(() => {
    spyUseCallback.mockReset();
  });

  test('should return whenever to show spinner', () => {
    expect(useFocus({ data: [] })).toEqual({
      showActivity: false
    });

    expect(useFocus({ isValidating: true })).toEqual({
      showActivity: true
    });

    expect(useFocus({ data: null })).toEqual({
      showActivity: true
    });

    expect(useFocus({ isLoading: true })).toEqual({
      showActivity: true
    });

    expect(useFocusEffect).toBeCalled();
    expect(React.useCallback).toBeCalled();
  });
});
