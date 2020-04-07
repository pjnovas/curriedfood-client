import { createAction } from 'utils/language';

export const initialState = {
  id: null,
  groceries: [],
  status: 'idle'
};

const STATUS_SET = 'STATUS/SET';
const STATUS_CLEAR = 'STATUS/CLEAR';
const SET_ID = 'SET_ID';
const SET_GROCERIES = 'SET_GROCERIES';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return { ...state, id: action.payload };
    case SET_GROCERIES:
      return { ...state, groceries: action.payload };
    case STATUS_SET:
      return { ...state, status: action.payload };
    case STATUS_CLEAR:
      return { ...state, status: initialState.status };
    default:
      return state;
  }
};

export const setStatus = createAction(STATUS_SET);
export const clearStatus = createAction(STATUS_CLEAR);
export const setId = createAction(SET_ID);
export const setGroceries = createAction(SET_GROCERIES);
