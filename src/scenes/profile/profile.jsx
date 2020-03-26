import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { Toolbar } from '../../components/toolbar';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';

export const ProfileScreen = (props) => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title="Perfil" onBackPress={props.navigation.goBack} />
    <Divider />
    <Layout style={styles.container}>
      <Text category="h1">PERFIL</Text>
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
