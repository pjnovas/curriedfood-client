import React from 'react';
import { ListItem, Text } from '@ui-kitten/components';

const IngredientListItem = ({
  product: { name },
  quantity,
  unit: { code },
  ...props
}) => (
  <ListItem {...props}>
    <Text category="s1">{`${quantity} ${code} de ${name}`}</Text>
  </ListItem>
);

export default IngredientListItem;
