import { useAxiosRetry } from 'use-axios-hooks';
import get from 'lodash/get';

// import Config from 'react-native-config'; >>> DOES NOT WORK WITH EXPO + RN 0.61
import Config from '../config';

const DISHES_URI = `${Config.API_URL}/dishes`;
const KITCHEN_URI = `${Config.API_URL}/kitchens`;

export const useAPI = (uri, options) =>
  useAxiosRetry(uri, {
    retryCount: 5,
    retryInterval: 2000,
    ...options
  });

export const useMyDishes = () => {
  const [{ data, isLoading, error }] = useAPI(DISHES_URI);
  return { data: get(data, 'data', []), isLoading, error };
};

export const useMyGroseries = () => {
  const [{ data, isLoading, error }] = useAPI(KITCHEN_URI);
  return { data: get(data, 'data[0].groceries', []), isLoading, error };
};
