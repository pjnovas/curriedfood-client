import { useRequestSWR } from 'hooks/service';
import { useProductTags, parser } from '../products';

jest.mock('hooks/service');

const products = [
  { id: 1, shop_tags: 'verduleria,super' },
  { id: 2, shop_tags: null },
  { id: 4, shop_tags: 'carniceria' },
  { id: 5, shop_tags: '' },
  { id: 6 }
];

const expectedTags = ['carniceria', 'super', 'verduleria'];

describe('parser', () => {
  test('parses a CSV field from a list of products', () => {
    expect(parser.shop_tags(products)).toEqual(expectedTags);
  });
});

describe('useProductTags', () => {
  test('fetches and parses a list of tags from products', () => {
    useRequestSWR.mockImplementation(() => ({
      data: products
    }));

    expect(useProductTags(parser.shop_tags)).toEqual({
      tags: expectedTags,
      loading: false
    });
  });

  test('has a loading state', () => {
    useRequestSWR.mockImplementation(() => ({
      data: null
    }));

    expect(useProductTags(parser.shop_tags)).toEqual({
      tags: null,
      loading: true
    });
  });
});
