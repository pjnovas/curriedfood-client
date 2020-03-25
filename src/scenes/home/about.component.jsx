import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout.component';

export const AboutScreen = (props) => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title="About" onBackPress={props.navigation.goBack} />
    <Divider />
    <Layout style={styles.container}>
      <Text category="h1">ABOUT</Text>
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
