import React from 'react';
import DishDetails from './dish-view';

// TODO: should check cache and fetch by id (web mode)

export const DishDetailsScreen = ({
  route: {
    params: { dish }
  }
}) => <DishDetails {...dish} />;
