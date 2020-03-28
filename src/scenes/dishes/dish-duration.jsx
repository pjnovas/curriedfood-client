import React from 'react';
import { ClockIcon } from '../../assets/icons';
import IconData from '../../components/icon-data';

const DishDuration = ({ duration, ...props }) => (
  <IconData icon={ClockIcon} text={`${duration}'`} {...props} />
);

export default DishDuration;
