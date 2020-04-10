import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useForm, FormContext } from 'react-hook-form';

import find from 'lodash/find';
import get from 'lodash/get';

import { useRequestSWR } from 'hooks/service';
import { useNavigateBack } from 'hooks/navigation';
import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';

import TextInput from 'components/input';
import { Toolbar } from 'components/toolbar';
import Spinner from 'components/spinner';
import Layout from 'components/layout';

const IngredientForm = ({ defaultValues, onSubmit }) => {
  const { handleSubmit, ...form } = useForm();

  return (
    <Layout style={styles.form}>
      <FormContext {...{ ...form, defaultValues }}>
        <TextInput
          required
          type="numeric"
          name="quantity"
          style={styles.formControl}
          label="Cantidad"
        />
        <FAB
          style={styles.fab}
          icon="content-save"
          onPress={handleSubmit(onSubmit)}
        />
      </FormContext>
    </Layout>
  );
};

export const IngredientEdit = ({
  route: {
    params: { id, title }
  }
}) => {
  const { data } = useRequestSWR(
    {
      url: `/shopping-lists`
    },
    { withPlace: true }
  );

  const item = data && find(get(data, '[0].groceries'), { id });

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title={`Editar ${title}`} onBackPress={useNavigateBack()} />
      {!item ? (
        <Spinner bar />
      ) : (
        <IngredientForm
          defaultValues={item}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 0,
    position: 'relative'
  },
  form: {
    padding: 20
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default IngredientEdit;
