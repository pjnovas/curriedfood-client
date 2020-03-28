import React from 'react';
import { CookLevelIcon } from '../../assets/icons';
import IconData from '../../components/icon-data';

const levels = ['Muy Fácil', 'Fácil', 'Normal', 'Difícil', 'Chef'];

const DishDificulty = ({ level, ...props }) => (
  <IconData icon={CookLevelIcon} text={levels[level]} {...props} />
);

export default DishDificulty;
