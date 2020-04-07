import { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'hooks/service';
import { combine } from 'utils/language';

import fetchList from './fetchList';
import addFrom from './addFrom';
import reducer, { initialState } from './reducer';

export const useMarket = () => {
  const request = useRequest({
    withPlace: true,
    onError: (error) => console.log('useMarket:Error', error)
  });

  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = combine({
    fetchList,
    addFrom
  })({
    getState: () => state,
    dispatch,
    request,
    navigation
  });

  return [state, actions];
};
