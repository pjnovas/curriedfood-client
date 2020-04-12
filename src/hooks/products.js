import { flow } from 'lodash';
import { map, compact, uniq, flatten, prop, split } from 'lodash/fp';
import { useRequestSWR } from 'hooks/service';

const parseTags = (field) =>
  flow(map(flow(prop(field), split(','))), flatten, uniq, compact);

export const parser = {
  shop_tags: parseTags('shop_tags'),
  kitchen_tags: parseTags('kitchen_tags')
};

export const useProductTags = (parser) => {
  const { data, ...rest } = useRequestSWR(
    {
      url: '/products'
    },
    { withPlace: true }
  );

  return {
    tags: data && parser(data),
    loading: !!(data === null),
    ...rest
  };
};
