import React from 'react';
import DishDetails from './dish-view';

export const DishDetailsScreen = ({
  route: {
    params: { dish }
  }
}) => <DishDetails {...dish} />;
