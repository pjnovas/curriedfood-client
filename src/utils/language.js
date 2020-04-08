// TODO: change name "language" into something more "redux-like"

import reactComposeHooks from 'react-hooks-compose';

export const createAction = (type) => (payload) => ({
  type,
  payload
});

export const combine = (funcs, delayed = false) => (args) =>
  Object.keys(funcs).reduce(
    (all, key) => ({
      ...all,
      [key]: delayed ? () => funcs[key](args) : funcs[key](args)
    }),
    {}
  );

export const composeHooks = (hooks) => reactComposeHooks(combine(hooks, true));
