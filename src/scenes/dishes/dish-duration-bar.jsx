import React from 'react';
import { StyleService } from '@ui-kitten/components';
import { ProgressBar } from '../../components/progress-bar';

const DishDurationBar = ({ duration }) => (
  <ProgressBar
    style={styles.bar}
    progress={duration}
    text={`${duration} min`}
  />
);

const styles = StyleService.create({
  bar: {
    width: '80%',
    marginVertical: 12
  }
});

export default DishDurationBar;
