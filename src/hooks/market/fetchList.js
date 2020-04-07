import { setStatus, setId, setGroceries, clearStatus } from './reducer';

export default ({ dispatch, request }) => async () => {
  dispatch(setStatus('fetching'));

  const {
    data: [{ id, groceries }]
  } = await request({
    url: '/shopping-lists',
    method: 'get'
  });

  dispatch(setId(id));
  dispatch(setGroceries(groceries));
  dispatch(clearStatus());

  return { id, groceries };
};
