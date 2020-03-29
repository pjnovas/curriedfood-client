import { useAxios } from 'use-axios-hooks';
import get from 'lodash/get';

import Config from '../config';

const PLACE_ID = 1; // TODO: TEMPORAL HARDCODE

const extractData = (dataProp = 'data') => ([{ data, ...props }]) => ({
  data: get(data, dataProp, {}),
  ...props
});

const fromData = extractData();
const fromGroceries = extractData('data[0].groceries');

export const useAPI = (uri, options) =>
  useAxios({
    url: `${Config.API_URL}/${uri}`,
    ...options
  });

export const useMyPlaces = () => fromData(useAPI('places'));

export const useMyDishes = () => fromData(useAPI(`dishes?place=${PLACE_ID}`));

export const useMyGroceries = () =>
  fromGroceries(useAPI(`kitchens?place=${PLACE_ID}`));

export const useMyShoppingList = () =>
  fromGroceries(useAPI(`shopping-lists?place=${PLACE_ID}`));
