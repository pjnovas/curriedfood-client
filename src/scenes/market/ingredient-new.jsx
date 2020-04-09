import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigateBack } from 'hooks/navigation';

import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';
import { Toolbar } from 'components/toolbar';
import Layout from 'components/layout';

export const IngredientNew = () => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title="Nuevo Ingrediente" onBackPress={useNavigateBack()} />
    <Layout>
      <Text>Nuevo Ingrediente</Text>
    </Layout>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 0,
    position: 'relative'
  }
});

export default IngredientNew;
