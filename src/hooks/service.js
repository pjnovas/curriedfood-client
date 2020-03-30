import { useAxios } from 'use-axios-hooks';
import get from 'lodash/get';
import curry from 'lodash/curry';

import { useAuth } from '../context/auth-context';
import Config from '../config';

export const extractData = curry((dataProp, [{ data, ...props }]) => ({
  data: get(data, dataProp, []),
  ...props
}));

export const useAPI = (uri, options) => {
  const [state, { signOut }] = useAuth();

  const result = useAxios({
    url: `${Config.API_URL}/${uri}`,
    headers: {
      Authorization: `Bearer ${state.jwt}`
    },
    ...options
  });

  const [{ error }] = result;
  if (get(error, 'response.statusCode') === 403) {
    // if has token expired
    console.log(error);
    signOut();
  }

  return result;
};
