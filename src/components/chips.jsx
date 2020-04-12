import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

import { noop, xor } from 'lodash';
import { composeHooks } from 'utils/language';

export const Chips = ({ list, items, onPress, ...props }) => (
  <ScrollView>
    {list.map((name) => (
      <Chip
        key={name}
        selected={items.includes(name)}
        mode="outlined"
        style={styles.chip}
        onPress={onPress(name)}
        {...props}
      >
        {name}
      </Chip>
    ))}
  </ScrollView>
);

Chips.propTypes = {
  ...Chip.PropTypes,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func
};

Chips.defaultProps = {
  items: [],
  onPress: noop
};

const styles = StyleSheet.create({
  chip: {
    marginVertical: 5,
    borderRadius: 4
  }
});

export const useFilter = ({ value, onChange }) => {
  const items = value ? value.split(',') : [];

  return {
    items,
    onPress: (name) => () => onChange(xor(items, [name]).join(','))
  };
};

export default composeHooks({ useFilter })(Chips);
