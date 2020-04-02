import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Caption } from 'react-native-paper';
import { useFormikContext } from 'formik';
import Theme from '../theme';

// TODO: Change Caption into HelperText for showing errors
// https://callstack.github.io/react-native-paper/helper-text.html

export const FormInput = ({ id, ...inputProps }) => {
  const formContext = useFormikContext();
  const { [id]: error } = formContext.errors;

  return (
    <>
      <TextInput
        {...inputProps}
        error={!!error}
        onChangeText={formContext.handleChange(id)}
        mode="outlined"
      />
      {error && <Caption style={styles.error}>{error}</Caption>}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Theme.colors.error
  }
});
