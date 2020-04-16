import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { composeHooks } from 'utils/language';

export const NumberInput = (props) => (
  <TextInput
    {...props}
    selectTextOnFocus
    style={[styles.layout, props.style]}
    mode="outlined"
    keyboardType="numeric"
    textAlign="right"
    dense
  />
);

const styles = StyleSheet.create({
  layout: {
    width: 80
  }
});

export const useValue = ({ defaultValue, onChangeValue }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const submitValue = () => {
    if (value !== defaultValue) {
      const newVal = Number(value.replace(',', '.'));
      if (!newVal) setValue(defaultValue);
      else onChangeValue(newVal);
    }
  };

  return {
    value,
    onChangeText: setValue,
    onBlur: submitValue,
    onSubmitEditing: submitValue
  };
};

export default composeHooks({ useValue })(NumberInput);
