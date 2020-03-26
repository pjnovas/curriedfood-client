import React from 'react';
import { ListItem, Text } from '@ui-kitten/components';
import DishDuration from './dish-duration';

const DishListItem = ({ title, duration, ...props }) => (
  <ListItem {...props}>
    <Text category="h6">{title}</Text>
    <DishDuration duration={duration} />
  </ListItem>
);

export default DishListItem;
