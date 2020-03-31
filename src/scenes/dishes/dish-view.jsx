import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  TabView,
  Tab,
  Divider,
  Layout,
  Text,
  Button
} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';
import { ShoppingCartAddIcon } from '../../assets/icons';
import { Toolbar } from '../../components/toolbar';
import { useNavigateBack } from '../../hooks/navigation';
import IngredientList from './ingredient-list';
import DishDuration from './dish-duration';
import DishDificulty from './dish-dificulty';

const DishDetails = (dish) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      {/* <Layout style={{ flex: 1, paddingTop: 20, position: 'relative' }}> */}
      {/* <Button
        style={styles.shopButton}
        status="primary"
        icon={ShoppingCartAddIcon}
      /> */}
      <Toolbar title={dish.title} onBackPress={useNavigateBack()} />
      <Divider />
      <Layout style={styles.infoBar}>
        <DishDuration duration={dish.duration} />
        <DishDificulty level={dish.level} />
      </Layout>
      <Divider />
      <Layout style={styles.content}>
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          <Tab title="INGREDIENTES">
            <Layout style={styles.ingredientsCtn}>
              <IngredientList dish={dish} />
              {/* <Button
                style={styles.shopButton}
                status="primary"
                icon={ShoppingCartAddIcon}
              /> */}
            </Layout>
          </Tab>
          {/* <Tab title="RECETA">
            <Layout style={styles.recipeContainer}>
              <Text>{dish.recipe}</Text>
            </Layout>
          </Tab> */}
        </TabView>
      </Layout>
      {/* </Layout> */}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // maxHeight: 500,
    paddingBottom: 0,
    position: 'relative'
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  // detailsContainer: {
  //   flex: 1
  // },
  // appBar: {
  //   flexDirection: 'row',
  //   height: 80
  // },
  recipeContainer: {
    paddingTop: 10,
    minHeight: 10
  },
  ingredientsCtn: {
    // flex: 1,
    flexBasis: 'auto',
    backgroundColor: 'blue',
    height: 200,
    position: 'relative'
  },
  shopButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    borderRadius: 5
  }
});

export default DishDetails;
