import useSWR from 'swr';
import axios from 'axios';
import { get, curry } from 'lodash';

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

export const useRequest = ({ withPlace, onError } = {}) => {
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

export const useRequestSWR = (
  request,
  { initialData, withPlace, ...config } = {}
) => {
  const [state /*, { signOut }*/] = useAuth();
  const placeID = usePlace();

  const req = {
    ...createAuthOptions(state),
    ...(request || {}),
    params: {
      place: withPlace && placeID,
      ...request.params
    }
  };

  const { data: response, error, isValidating, mutate, revalidate } = useSWR(
    request && JSON.stringify(req),
    () => axios(request ? req : {}),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData
      }
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
    revalidate
  };
};
