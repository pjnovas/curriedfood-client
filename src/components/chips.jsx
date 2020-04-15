import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip, TextInput } from 'react-native-paper';

import { noop, xor, uniq } from 'lodash';
import { composeHooks } from 'utils/language';

export const Chips = ({
  allItems,
  items,
  onPress,
  allowNew,
  onNew,
  onChangeText,
  newValue,
  ...props
}) => (
  <>
    <ScrollView>
      {allItems.map((name) => (
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
    {allowNew && (
      <TextInput
        value={newValue}
        label="Nueva Categoría"
        mode="outlined"
        onChangeText={onChangeText}
        onSubmitEditing={onNew}
        dense
      />
    )}
  </>
);

Chips.propTypes = {
  allItems: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func,
  allowNew: PropTypes.bool,
  newValue: PropTypes.string,
  onChangeText: PropTypes.func
};

Chips.defaultProps = {
  allItems: [],
  items: [],
  onPress: noop,
  allowNew: false,
  newValue: '',
  onChangeText: noop
};

const styles = StyleSheet.create({
  chip: {
    marginVertical: 5,
    borderRadius: 4
  }
});

export const useFilter = ({ list = [], value, onChange }) => {
  const [newValue, setValue] = useState('');
  const items = value ? value.split(',') : [];

  return {
    allowNew: true,
    allItems: uniq([...list, ...items]),
    items,
    onPress: (name) => () => onChange(xor(items, [name]).join(',')),
    // New Item
    onChangeText: setValue,
    newValue,
    onNew: () => {
      setValue('');
      onChange([...items, newValue].join(','));
    }
  };
};

const Container = composeHooks({ useFilter })(Chips);

Container.propTypes = {
  ...Chip.PropTypes,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Container.defaultProps = {
  ...Chip.PropTypes,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Container;
