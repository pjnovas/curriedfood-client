import { flow, get, isEmpty, includes, sortBy, mapValues } from 'lodash';
import { parseTags } from 'hooks/products';

export const longName = {
  un: 'unidades',
  cu: 'cucharadas',
  gr: 'gramos',
  lt: 'litros',
  cc: 'cm cúbicos',
  tz: 'tazas',
  ml: 'mililitros',
  di: 'dientes',
  ca: 'cabezas',
  cn: 'latas',
  pi: 'pizca',
  xy: 'a gusto'
};

export const unitText = {
  un: '',
  cu: `${longName.cu} de`,
  gr: `${longName.gr} de`,
  lt: `${longName.lt} de`,
  cc: longName.cc,
  tz: `${longName.tz} de`,
  ml: longName.ml,
  di: longName.di,
  ca: longName.ca,
  cn: longName.cn,
  pi: longName.pi,
  xy: longName.xy
};

export const convert = flow(
  Number,
  (qty) => qty.toFixed(2),
  (qty) => qty.replace('.00', ''),
  (qty) => qty.replace('.', ',')
);

// Not supported on android
// Number(qty).toLocaleString('es-AR', {
//   minimumFractionDigits: 0,
//   maximumFractionDigits: 2
// });

export const getText = ({
  product: { name, unit },
  quantity,
  alt_quantity,
  alt_unit
}) => {
  let text = `${convert(quantity)} ${unitText[unit] || ''} ${name}`;

  if (alt_quantity) {
    text += ` (${convert(alt_quantity)} ${unitText[alt_unit]})`;
  }

  return text;
};

export const groupByTags = (tagProp) => (data) => {
  const tags = parseTags(tagProp)(data);

  let resolved = tags.reduce(
    (all, tag) => ({
      ...all,
      [tag]: data.filter((item) => includes(get(item, tagProp), tag))
    }),
    {
      'sin categoria': data.filter((item) => isEmpty(get(item, tagProp)))
    }
  );

  if (isEmpty(resolved['sin categoria'])) {
    delete resolved['sin categoria'];
  }

  return mapValues(resolved, (item) =>
    sortBy(item, ({ product }) => product.name)
  );
};

export const groupByShopTags = groupByTags('product.shop_tags');
