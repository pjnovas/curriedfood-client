import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Layout from 'components/layout';
import { Toolbar } from 'components/toolbar';
import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';

export const AboutScreen = (props) => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title="About" onBackPress={props.navigation.goBack} />
    <Divider />
    <Layout style={styles.container}>
      <Text>ABOUT</Text>
    </Layout>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
