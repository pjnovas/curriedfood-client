import { useAxiosRetry } from 'use-axios-hooks';
import get from 'lodash/get';

// import Config from 'react-native-config'; >>> DOES NOT WORK WITH EXPO + RN 0.61
import Config from '../config';

const PLACE_ID = 1; // TODO: TEMPORAL HARDCODE

const PLACES_URI = `${Config.API_URL}/places`;
const DISHES_URI = `${Config.API_URL}/dishes`;
const KITCHEN_URI = `${Config.API_URL}/kitchens`;
const SHOPPING_URI = `${Config.API_URL}/shopping-lists`;

export const useAPI = (uri, options) =>
  useAxiosRetry(uri, {
    retryCount: 5,
    retryInterval: 2000,
    ...options
  });

export const useMyPlaces = () => {
  const [{ data, isLoading, error }] = useAPI(PLACES_URI);
  return { data: get(data, 'data', []), isLoading, error };
};

export const useMyDishes = () => {
  const [{ data, isLoading, error }] = useAPI(
    `${DISHES_URI}?place.id=${PLACE_ID}`
  );
  return { data: get(data, 'data', []), isLoading, error };
};

export const useMyGroseries = () => {
  const [{ data, isLoading, error }] = useAPI(
    `${KITCHEN_URI}?place.id=${PLACE_ID}`
  );
  return { data: get(data, 'data[0].groceries', []), isLoading, error };
};

export const useMyShoppingList = () => {
  const [{ data, isLoading, error }] = useAPI(
    `${SHOPPING_URI}?place.id=${PLACE_ID}`
  );
  return { data: get(data, 'data[0].groceries', []), isLoading, error };
};
