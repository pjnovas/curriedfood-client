export const unitText = {
  un: '',
  cu: 'cucharadas de',
  gr: 'gramos de',
  lt: 'litros de',
  tz: 'tazas de',
  ml: 'mililitros'
};

export const getText = ({
  product: { name },
  quantity,
  unit: { code },
  alt_quantity,
  alt_unit
}) => {
  let text = `${quantity} ${unitText[code] || ''} ${name}`;

  if (alt_quantity) {
    text += ` (${alt_quantity} ${alt_unit.code})`;
  }

  return text;
};
