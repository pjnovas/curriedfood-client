import React from 'react';
import { ListItem, Text } from '@ui-kitten/components';
import DishDurationBar from './dish-duration-bar';

const DishListItem = ({ title, recipe, duration, ...props }) => (
  <ListItem {...props}>
    <Text category="s1">{title}</Text>
    <DishDurationBar duration={duration} />
  </ListItem>
);

export default DishListItem;
