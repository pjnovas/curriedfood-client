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

export const getText = ({
  product: { name, unit },
  quantity,
  alt_quantity,
  alt_unit
}) => {
  let text = `${quantity} ${unitText[unit] || ''} ${name}`;

  if (alt_quantity) {
    text += ` (${alt_quantity} ${unitText[alt_unit]})`;
  }

  return text;
};
