import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Paragraph, Divider } from 'react-native-paper';

import Theme from 'theme';

import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';
import { Toolbar } from 'components/toolbar';
import Layout from 'components/layout';
import { useNavigateBack } from 'hooks/navigation';

import IngredientList from './ingredient-list';
import DishDuration from './dish-duration';
import DishDificulty from './dish-dificulty';

// TODO: Move this into a Navigator

const DishDetails = (dish) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'recipe', title: 'RECETA' },
    { key: 'ingredients', title: 'INGREDIENTES' }
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'ingredients':
        return <IngredientList dish={dish} />;
      case 'recipe':
        return (
          <Layout style={styles.recipeContainer}>
            <Layout style={styles.infoBar}>
              <DishDuration duration={dish.duration} />
              <DishDificulty level={dish.level} />
            </Layout>
            <Divider />
            <Paragraph style={styles.recipe}>{dish.recipe}</Paragraph>
          </Layout>
        );
    }
  };

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title={dish.title} onBackPress={useNavigateBack()} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
          />
        )}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 0,
    position: 'relative'
  },
  infoBar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8
  },
  recipeContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  recipe: {
    paddingTop: 8
  },
  indicator: {
    backgroundColor: Theme.colors.text
  },
  tabBar: {
    backgroundColor: Theme.colors.primary
  }
});

export default DishDetails;
