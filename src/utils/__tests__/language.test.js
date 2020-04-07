import identity from 'lodash/identity';
import { combine, createAction } from '../language';

describe('createAction', () => {
  test('should be an actionCreator', () => {
    const type = 'EXPLODE';
    const explode = createAction(type);

    expect(explode()).toEqual({
      type
    });

    expect(explode('BOOM')).toEqual({
      type,
      payload: 'BOOM'
    });
  });
});

describe('combine', () => {
  test('should work like the combine of react-redux', () => {
    const a = jest.fn(identity);
    const b = jest.fn(identity);
    const c = jest.fn(identity);

    const args = {
      some: 'prop'
    };

    const combined = combine({ a, b, c })(args);

    expect(a).toHaveBeenCalledWith(args);
    expect(b).toHaveBeenCalledWith(args);
    expect(c).toHaveBeenCalledWith(args);

    expect(combined.a).toEqual(args);
    expect(combined.b).toEqual(args);
    expect(combined.c).toEqual(args);
  });
});
