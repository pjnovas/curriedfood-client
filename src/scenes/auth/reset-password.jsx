import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import Layout from '../../components/layout';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input';
import { Toolbar } from '../../components/toolbar';
import {
  ResetPasswordData,
  ResetPasswordSchema
} from '../../data/reset-password.model';

export const ResetPasswordScreen = ({ navigation }) => {
  const onFormSubmit = (/*values*/) => {
    navigateSignIn();
  };

  const navigateSignIn = () => {
    navigation.navigate(AppRoute.SIGN_IN);
  };

  const renderForm = ({ handleSubmit }) => (
    <Layout>
      <FormInput
        id="email"
        style={styles.formControl}
        label="Email"
        keyboardType="email-address"
      />
      <Button
        dark
        mode="contained"
        style={styles.button}
        onPress={handleSubmit}
      >
        RECUPERAR
      </Button>
    </Layout>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title="Recuperar Contraseña" onBackPress={navigation.goBack} />
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={ResetPasswordData.empty()}
          validationSchema={ResetPasswordSchema}
          onSubmit={onFormSubmit}
        >
          {renderForm}
        </Formik>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  formControl: {
    marginVertical: 4
  },
  button: {
    marginVertical: 24
  }
});
