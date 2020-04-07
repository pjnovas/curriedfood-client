export const createAction = (type) => (payload) => ({
  type,
  payload
});

export const combine = (funcs) => (args) =>
  Object.keys(funcs).reduce(
    (all, key) => ({
      ...all,
      [key]: funcs[key](args)
    }),
    {}
  );
