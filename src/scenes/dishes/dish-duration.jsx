import React from 'react';
import IconData from 'components/icon-data';

const DishDuration = ({ duration, ...props }) => (
  <IconData icon="clock-outline" text={`${duration}'`} {...props} />
);

export default DishDuration;
