import React from 'react';
import { ImageBackground, StyleSheet /*, View*/ } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
// import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import { SignInData, SignInSchema } from '../../data/sign-in.model';

import { useAuth } from '../../context/auth-context';

export const SignInScreen = (/*props*/) => {
  const [state, { signIn }] = useAuth();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  // const onFormSubmit = (values) => {
  //   signIn(values);
  // };

  // const navigateSignUp = () => {
  //   props.navigation.navigate(AppRoute.SIGN_UP);
  // };

  // const navigateResetPassword = () => {
  //   props.navigation.navigate(AppRoute.RESET_PASSWORD);
  // };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderForm = (props) => (
    <Layout>
      <FormInput
        id="identifier"
        style={styles.formControl}
        placeholder="Email"
        keyboardType="email-address"
      />
      <FormInput
        id="password"
        style={styles.formControl}
        placeholder="Contraseña"
        secureTextEntry={!passwordVisible}
        icon={passwordVisible ? EyeIcon : EyeOffIcon}
        onIconPress={onPasswordIconPress}
      />
      {/* <View style={styles.resetPasswordContainer}>
        <Button
          appearance="ghost"
          status="basic"
          onPress={navigateResetPassword}
        >
          Forgot password?
        </Button>
      </View> */}
      {state.error && (
        <Text style={styles.errorContent} status="danger">
          {state.error}
        </Text>
      )}
      <Button
        style={styles.submitButton}
        onPress={props.handleSubmit}
        disabled={state.loading}
      >
        {`${state.loading ? 'Ingresando ...' : 'Ingresar'}`}
      </Button>
    </Layout>
  );

  return (
    <React.Fragment>
      <ImageBackground
        style={styles.appBar}
        source={require('../../assets/image-background.jpeg')}
      />
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={SignInData.empty()}
          validationSchema={SignInSchema}
          onSubmit={signIn}
        >
          {renderForm}
        </Formik>
        {/* <Button
          style={styles.noAccountButton}
          appearance="ghost"
          status="basic"
          onPress={navigateSignUp}
        >
          {"Don't have an account?"}
        </Button> */}
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 192
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorContent: {
    margin: 8
  },
  formControl: {
    marginVertical: 4
  },
  submitButton: {
    marginVertical: 24
  },
  noAccountButton: {
    alignSelf: 'center'
  }
});
