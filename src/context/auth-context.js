import React, { useMemo } from 'react';
import get from 'lodash/get';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import Config from '../config';

const AuthContext = React.createContext();

const initial = {
  loading: true,
  jwt: null,
  error: null,
  user: null,
  hasSignOut: false
};

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_DATA':
        return {
          ...prevState,
          ...action.payload,
          loading: false
        };
      case 'LOADING':
        return { ...prevState, error: null, loading: true };
      case 'SIGN_IN':
        return { ...initial, ...action.payload, loading: false };
      case 'SIGN_IN_FAILED': {
        return { ...prevState, ...action.payload, loading: false };
      }
      case 'SIGN_OUT':
        return { ...initial, hasSignOut: true, loading: false };
    }
  }, initial);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let jwt, user;

      try {
        jwt = await AsyncStorage.getItem('@jwt');
        user = await AsyncStorage.getItem('@user');
      } catch (e) {
        console.log('Restore Auth FAILED', e);
      }

      dispatch({
        type: 'RESTORE_DATA',
        payload: {
          jwt,
          user: user && JSON.parse(user)
        }
      });
    };

    if (!state.hasSignOut) {
      bootstrapAsync();
    }
  }, [state.hasSignOut, state.jwt]);

  const actions = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'LOADING' });

        try {
          const {
            data: { jwt, user }
          } = await axios.post(`${Config.API_URL}/auth/local`, data);

          try {
            await AsyncStorage.setItem('@jwt', jwt);
            await AsyncStorage.setItem('@user', JSON.stringify(user));
          } catch (e) {
            console.log('Store Auth FAILED', e);
          }

          dispatch({ type: 'SIGN_IN', payload: data });
        } catch (error) {
          if (error.response) {
            if (get(error.response, 'status') === 400) {
              dispatch({
                type: 'SIGN_IN_FAILED',
                payload: {
                  error: 'email o contraseña incorrectos'
                }
              });

              return;
            }

            dispatch({
              type: 'SIGN_IN_FAILED',
              payload: {
                error: get(
                  error.response,
                  'data.message[0].messages[0].message'
                )
              }
            });

            return;
          }

          dispatch({
            type: 'SIGN_IN_FAILED',
            payload: {
              error: 'Error no esperado'
            }
          });
        }
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('@jwt');
          await AsyncStorage.removeItem('@user');
        } catch (e) {
          console.log('Clear Auth FAILED', e);
        }

        dispatch({ type: 'SIGN_OUT' });
      },

      signUp: async (data) => {
        // TODO: send data to api
        console.log('signUp', data);
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={[state, actions]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

function usePlace() {
  const [state] = useAuth();
  // TODO: allow user to select a place
  return get(state, 'user.places[0].id');
}

export { AuthProvider, useAuth, usePlace };
