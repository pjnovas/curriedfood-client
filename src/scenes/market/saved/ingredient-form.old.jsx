import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { FAB, Subheading } from 'react-native-paper';
import { useForm, FormContext } from 'react-hook-form';

import noop from 'lodash/noop';
import { composeHooks } from 'utils/language';
import { longName } from 'utils/grocery';
import TextInput from 'components/input';
import Layout from 'components/layout';

export const IngredientForm = ({
  form,
  defaultValues,
  onSubmit,
  submitIcon
}) => (
  <Layout style={styles.form}>
    <FormContext {...{ ...form, defaultValues }}>
      <View style={styles.quantityCtn}>
        <TextInput
          required
          type="numeric"
          name="quantity"
          style={styles.quantity}
          label="Cantidad"
        />
        <Subheading style={styles.unit}>
          {longName[defaultValues.product.unit]}
        </Subheading>
      </View>
      {/* <FAB
        style={styles.fab}
        icon={submitIcon}
        onPress={form.handleSubmit(onSubmit)}
      /> */}
    </FormContext>
  </Layout>
);

IngredientForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitIcon: PropTypes.string
};

IngredientForm.defaultProps = {
  defaultValues: {
    quantity: 0
  },
  onSubmit: noop,
  submitIcon: 'content-save'
};

const styles = StyleSheet.create({
  form: {
    flex: 1
    // padding: 20
  },
  quantityCtn: {
    flexDirection: 'row',
    height: 65
  },
  quantity: {
    flex: 2
  },
  unit: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    color: 'gray',
    borderColor: 'gray'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export const useFormMarket = () => ({
  form: useForm()
});

export default composeHooks({ useFormMarket })(IngredientForm);
