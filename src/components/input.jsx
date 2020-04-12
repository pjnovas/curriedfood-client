import React, { useEffect } from 'react';
import { get } from 'lodash';
import { TextInput, HelperText } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';

const setDefaultValue = (type, value) => {
  return value && `${value}`;
};

const getValue = (type, value) => {
  if (type === 'numeric') {
    return Number(value);
  }

  return `${value}`;
};

const parseValue = ({ name, type, setValue }) => (value) => {
  setValue(name, getValue(type, value));
};

const getKeyboardType = (type) => {
  return type == 'numeric' ? 'numeric' : 'default';
};

const FormInput = ({ type, name, required, ...props }) => {
  const { register, setValue, error, defaultValues } = useFormContext();
  const fieldError = get(error, name);

  useEffect(() => {
    register({ name }, { required });
  }, [name, register, required]);

  return (
    <>
      <TextInput
        mode="outlined"
        name={name}
        keyboardType={getKeyboardType(type)}
        onChangeText={parseValue({ type, name, setValue })}
        defaultValue={setDefaultValue(type, get(defaultValues, name))}
        {...props}
      />
      <HelperText type="error" visible={!!fieldError}>
        {fieldError}
      </HelperText>
    </>
  );
};

export default FormInput;
