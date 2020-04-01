import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import { StyleSheet } from 'react-native';
import { ToggleButton, Text } from 'react-native-paper';
import Layout from './layout';

// TODO: Allow a bigger range of numbers using arrows to navigate

const NumericSelector = ({
  label,
  selected,
  onChange,
  min,
  // max,
  visibleItems
}) => (
  <Layout style={styles.container}>
    {label && (
      <Text appearance="hint" category="s1">
        {label}
      </Text>
    )}
    <ToggleButton.Row
      style={styles.buttonGroup}
      onValueChange={onChange}
      value={selected}
    >
      {times(visibleItems, (i) => i + min).map((i) => (
        <ToggleButton icon={`numeric-${i}`} key={i} value={i} />
      ))}
    </ToggleButton.Row>
  </Layout>
);

NumericSelector.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  visibleItems: PropTypes.number,
  onChange: PropTypes.func
};

NumericSelector.defaultProps = {
  selected: 1,
  min: 1,
  visibleItems: 5
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },
  buttonGroup: {
    marginVertical: 8
  }
});

export default NumericSelector;
