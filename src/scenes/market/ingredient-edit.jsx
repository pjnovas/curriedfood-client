import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { FAB } from 'react-native-paper';

import find from 'lodash/find';
import get from 'lodash/get';

import { useRequestSWR } from 'hooks/service';
import { useNavigateBack } from 'hooks/navigation';
import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';

import { FormInput } from 'components/form-input';
import { Toolbar } from 'components/toolbar';
import Spinner from 'components/spinner';
import Layout from 'components/layout';

// TODO: should check cache and fetch by id (web mode)

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

  const renderForm = ({ handleSubmit }) => (
    <>
      <FormInput id="quantity" style={styles.formControl} label="Cantidad" />
      <FAB style={styles.fab} icon="save" onPress={handleSubmit} />
    </>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title={`Editar ${title}`} onBackPress={useNavigateBack()} />
      {!item ? (
        <Spinner bar />
      ) : (
        <Layout style={styles.form}>
          <Formik
            initialValues={item}
            // validationSchema={}
            onSubmit={(values) => console.log(values)}
          >
            {renderForm}
          </Formik>
        </Layout>
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
