import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, Button, Subheading } from 'react-native-paper';
import Theme from 'theme';

import { useForm, FormContext } from 'react-hook-form';

import { composeHooks } from 'utils/language';
import { longName } from 'utils/grocery';
import TextInput from 'components/input';
import Layout from 'components/layout';

export const IngredientEdit = ({
  form,
  onDismiss,
  onSubmit,
  ...defaultValues
}) => (
  <Portal>
    <FormContext {...{ ...form, defaultValues }}>
      <Dialog style={styles.layout} visible dismissable onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>
          {defaultValues.product.name}
        </Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Layout style={styles.form}>
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
          </Layout>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button
            dark
            mode="contained"
            style={styles.okButton}
            onPress={form.handleSubmit(onSubmit)}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </FormContext>
  </Portal>
);

// IngredientForm.propTypes = {
//   route: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       title: PropTypes.string
//     })
//   })
// };

// IngredientForm.defaultProps = {
//   route: {
//     params: { title: '' }
//   }
// };

const styles = StyleSheet.create({
  layout: {},
  title: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  content: {
    minHeight: 100
  },
  actions: {
    // flex: 1
    // textAlign: 'center'
  },
  okButton: {
    marginHorizontal: 10
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
  }
});

export const useFormMarket = () => ({
  form: useForm()
});

export default composeHooks({ useFormMarket })(IngredientEdit);
