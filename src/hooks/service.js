import axios from 'axios';
import { useAxios } from 'use-axios-hooks';
import get from 'lodash/get';
import curry from 'lodash/curry';

import { useAuth, usePlace } from 'context/auth-context';
import Config from 'config.json';

export const extractData = curry((dataProp, [{ data, ...props }]) => ({
  data: get(data, dataProp, []),
  ...props
}));

const createAuthOptions = ({ jwt }, url) => ({
  baseURL: Config.API_URL,
  url,
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

export const useAuthOptions = (url) => {
  const [state] = useAuth();
  return createAuthOptions(state, url);
};

export const useAxiosWithAuth = (uri, options) =>
  useAxios({
    ...useAuthOptions(uri),
    ...options
  });

// TODO: remove this into "useRequest" with a "Sync" option
export const useAPI = (uri, options) => {
  const [, { signOut }] = useAuth();
  const result = useAxiosWithAuth(uri, options);

  const [{ error }] = result;
  if (get(error, 'response.statusCode') === 403) {
    // if has token expired
    console.log(error);
    signOut();
  }

  return result;
};

export const useRequest = ({ withPlace, onError }) => {
  const [state, { signOut }] = useAuth();
  const placeID = usePlace();

  return async (request) => {
    try {
      return await axios.request({
        ...createAuthOptions(state),
        ...request,
        params: {
          place: withPlace && placeID,
          ...request.params
        }
      });
    } catch (error) {
      if (get(error, 'response.status') === 403) {
        console.log(error);
        return signOut();
      }

      onError(error.response ? error.response : error);
    }
  };
};
