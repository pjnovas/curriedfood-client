import { View } from 'react-native';
import LazyContent from '../lazy-content';

takeSnapshots(
  {
    default: {},
    loading: {
      isLoading: true
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
