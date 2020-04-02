import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import Layout from '../../components/layout';
import { AppRoute } from '../../navigation/app-routes';
import { Toolbar } from '../../components/toolbar';
import { FormInput } from '../../components/form-input';
import { SignUpData, SignUpSchema } from '../../data/sign-up.model';

export const SignUpScreen = ({ navigation }) => {
  const onFormSubmit = (/*values*/) => {
    navigateHome();
  };

  const navigateHome = () => {
    navigation.navigate(AppRoute.HOME);
  };

  const navigateSignIn = () => {
    navigation.navigate(AppRoute.SIGN_IN);
  };

  const renderForm = ({ handleSubmit }) => (
    <React.Fragment>
      <FormInput
        id="email"
        style={styles.formControl}
        label="Email"
        keyboardType="email-address"
      />
      <FormInput id="password" style={styles.formControl} label="Contraseña" />
      <FormInput id="username" style={styles.formControl} label="Usuario" />
      <Button
        dark
        mode="contained"
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        REGISTRARME
      </Button>
    </React.Fragment>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title="Registro" onBackPress={navigation.goBack} />
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={SignUpData.empty()}
          validationSchema={SignUpSchema}
          onSubmit={onFormSubmit}
        >
          {renderForm}
        </Formik>
        <Button dark style={styles.haveAccountButton} onPress={navigateSignIn}>
          Ya tengo cuenta
        </Button>
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
  submitButton: {
    marginVertical: 24
  },
  haveAccountButton: {
    alignSelf: 'center'
  }
});
