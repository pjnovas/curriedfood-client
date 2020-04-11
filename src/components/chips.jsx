import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const Chips = ({ list, value, onChange }) => {
  const items = (value || '').split(',');

  return (
    <ScrollView>
      {list.map((name) => (
        <Chip
          key={name}
          selected={items.includes(name)}
          mode="outlined"
          style={styles.chip}
          onPress={() =>
            onChange(
              (items.includes(name)
                ? items.filter((item) => item !== name)
                : [...items, name]
              ).join(',')
            )
          }
        >
          {name}
        </Chip>
      ))}
    </ScrollView>
  );
};

Chips.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Chips.defaultProps = {
  value: '',
  onChange: noop
};

const styles = StyleSheet.create({
  chip: {
    marginVertical: 5,
    borderRadius: 4
  }
});

export default Chips;
