import React from 'react';
import IconData from '../../components/icon-data';

const levels = ['Muy Fácil', 'Fácil', 'Normal', 'Difícil', 'Chef'];

const DishDificulty = ({ level, ...props }) => (
  <IconData icon="chef-hat" text={levels[level]} {...props} />
);

export default DishDificulty;
