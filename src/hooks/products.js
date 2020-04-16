import { flow } from 'lodash';
import {
  map,
  compact,
  uniq,
  flatten,
  prop,
  split,
  identity,
  sortBy
} from 'lodash/fp';
import { useRequestSWR } from 'hooks/service';

export const parseTags = (field) =>
  flow(
    map(flow(prop(field), split(','))),
    flatten,
    uniq,
    compact,
    sortBy(identity)
  );

export const parser = {
  shop_tags: parseTags('shop_tags'),
  kitchen_tags: parseTags('kitchen_tags')
};

export const useProductList = () => {
  const { data, ...rest } = useRequestSWR(
    {
      url: '/products'
    },
    { withPlace: true }
  );

  return {
    data: data ? sortBy('name', data) : data,
    loading: !!(data === null),
    ...rest
  };
};

export const useProductTags = (parser) => {
  const { data, ...rest } = useProductList();

  return {
    tags: data && parser(data),
    ...rest
  };
};
