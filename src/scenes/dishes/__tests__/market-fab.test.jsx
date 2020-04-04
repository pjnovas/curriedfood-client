import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { FAB } from 'react-native-paper';

import MarketFab, { ConfirmDialog } from '../market-fab';
// import { useNavigateTo } from 'hooks/navigation';

jest.mock('hooks/navigation');

const props = {
  ingredients: [
    {
      id: 1,
      quantity: 3,
      product: {
        name: 'Eggs',
        divisible: false
      },
      unit: {
        code: 'un'
      }
    },
    {
      id: 2,
      quantity: 150,
      product: {
        name: 'Olives',
        divisible: true
      },
      unit: {
        code: 'gr'
      }
    }
  ],
  servings: 4
};

describe('MarketFab', () => {
  takeSnapshots(
    {
      'renders nothing with no ingredients': {
        ...props,
        ingredients: []
      },
      'renders a FAB Button with ingredients': props
    },
    MarketFab
  );

  test('renders a ConfirmDialog when FAB is clicked', () => {
    const wrapper = shallow(<MarketFab {...props} />);
    wrapper.find(FAB).simulate('press');
    takeSnapshotFrom(wrapper);
  });

  test('renders a FAB Button when confirm dialog is dismissed', () => {
    const wrapper = shallow(<MarketFab {...props} />);
    wrapper.find(FAB).simulate('press'); // open dialog
    wrapper.find(ConfirmDialog).simulate('dismiss');
    takeSnapshotFrom(wrapper);
  });
});

describe('ConfirmDialog', () => {
  takeSnapshots(
    {
      default: props
    },
    ConfirmDialog
  );
});
