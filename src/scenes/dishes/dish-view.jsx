import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TabView, Tab, Divider, Layout, Text } from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';
import { Toolbar } from '../../components/toolbar';
import { useNavigateBack } from '../../hooks/navigation';
import IngredientList from './ingredient-list';
import DishDuration from './dish-duration';
import DishDificulty from './dish-dificulty';

const DishDetails = (dish) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      title={styles.title}
      insets={SaveAreaInset.TOP}
    >
      <Toolbar title={dish.title} onBackPress={useNavigateBack()} />
      <Divider />
      <Layout style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <DishDuration duration={dish.duration} />
        <DishDificulty level={dish.level} />
      </Layout>
      <Divider />
      <Layout style={styles.content}>
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="INGREDIENTES">
            <IngredientList dish={dish} />
          </Tab>
          <Tab title="RECETA">
            <Layout style={styles.tabContainer}>
              <Text>{dish.recipe}</Text>
            </Layout>
          </Tab>
        </TabView>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  infoBar: {
    flex: 0,
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  content: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  detailsContainer: {
    flex: 1
  },
  title: {
    alignSelf: 'center'
  },
  appBar: {
    flexDirection: 'row',
    height: 80
  },
  tabContainer: {
    paddingTop: 10,
    minHeight: 10
  }
});

export default DishDetails;
