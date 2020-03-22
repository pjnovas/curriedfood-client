import React, { useReducer } from 'react';
import Dishes from '../components/Dishes';

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Dishes
      setCount={() => dispatch({ type: 'increment' })}
      count={state.count}
    />
  );
};
