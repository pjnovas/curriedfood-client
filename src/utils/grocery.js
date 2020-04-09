import flow from 'lodash/flow';

export const unitText = {
  un: '',
  cu: 'cucharadas de',
  gr: 'gramos de',
  lt: 'litros de',
  cc: 'cm cúbicos',
  tz: 'tazas de',
  ml: 'mililitros',
  di: 'dientes',
  ca: 'cabezas',
  cn: 'latas',
  pi: 'pizca',
  xy: 'a gusto'
};

const convert = flow(
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
