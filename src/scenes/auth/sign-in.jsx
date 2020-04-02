import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Title, Colors } from 'react-native-paper';
import { Formik } from 'formik';
import { AppRoute } from '../../navigation/app-routes';
import Layout from '../../components/layout';
import Theme from '../../theme';
import { FormInput } from '../../components/form-input';
import { SignInData, SignInSchema } from '../../data/sign-in.model';

import { useAuth } from '../../context/auth-context';

export const SignInScreen = ({ navigation }) => {
  const [state, { signIn }] = useAuth();
  // const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onFormSubmit = (values) => {
    signIn(values);
  };

  const navigateSignUp = () => {
    navigation.navigate(AppRoute.SIGN_UP);
  };

  const navigateResetPassword = () => {
    navigation.navigate(AppRoute.RESET_PASSWORD);
  };

  // const onPasswordIconPress = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  const renderForm = ({ handleSubmit }) => (
    <Layout>
      <FormInput
        id="identifier"
        style={styles.formControl}
        label="Email"
        keyboardType="email-address"
      />
      <FormInput
        id="password"
        style={styles.formControl}
        label="Contraseña"
        secureTextEntry
        // secureTextEntry={!passwordVisible}
        // icon={passwordVisible ? EyeIcon : EyeOffIcon}
        // onIconPress={onPasswordIconPress}
      />
      <Button
        dark
        onPress={navigateResetPassword}
        style={styles.resetPassword}
        labelStyle={styles.resetPasswordText}
      >
        olvidaste la contraseña?
      </Button>
      {state.error && (
        <Caption style={styles.errorContent}>{`Error: ${state.error}`}</Caption>
      )}
      <Button
        dark
        mode="contained"
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={state.loading}
        loading={state.loading}
      >
        Ingresar
      </Button>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleCtn}>
        <Title style={styles.title}>Curried Food</Title>
      </Layout>
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={SignInData.empty()}
          validationSchema={SignInSchema}
          onSubmit={onFormSubmit}
        >
          {renderForm}
        </Formik>
      </Layout>
      <Button dark style={styles.noAccountButton} onPress={navigateSignUp}>
        No tengo cuenta
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  titleCtn: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.deepPurple300
  },
  resetPassword: {
    alignSelf: 'flex-end'
  },
  resetPasswordText: {
    color: Theme.colors.text,
    fontSize: 12
  },
  errorContent: {
    marginTop: 10,
    marginBottom: 0,
    fontSize: 20,
    alignSelf: 'center',
    color: Theme.colors.error
  },
  formControl: {
    marginVertical: 4
  },
  submitButton: {
    marginVertical: 24
  },
  noAccountButton: {
    flex: 1,
    alignSelf: 'center'
  }
});
