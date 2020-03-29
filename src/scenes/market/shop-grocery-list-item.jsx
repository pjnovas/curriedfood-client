import React from 'react';
import { ListItem, Text } from '@ui-kitten/components';

const unitText = {
  un: '',
  cu: 'cucharadas de',
  gr: 'gramos de',
  lt: 'litros de',
  tz: 'tazas de',
  ml: 'mililitros'
};

const getText = ({
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

const ShopGroceryListItem = (props) => (
  <ListItem {...props}>
    <Text category="s1">{getText(props)}</Text>
  </ListItem>
);

export default ShopGroceryListItem;
