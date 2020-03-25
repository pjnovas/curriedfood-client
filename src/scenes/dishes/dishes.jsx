import React from 'react';
import {
  Layout,
  List,
  ListItem,
  StyleService,
  Text,
  useStyleSheet
} from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar';

import { useAxiosRetry } from 'use-axios-hooks';

// import Config from 'react-native-config'; >>> DOES NOT WORK
import Config from '../../config';

const DISHES_URI = `${Config.API_URL}/dishes`;

export const DishesScreen = (props) => {
  const [{ data, isLoading, error }] = useAxiosRetry(DISHES_URI, {
    retryCount: 5,
    retryInterval: 2000
  });

  const styles = useStyleSheet(themedStyles);

  const navigateDishDetails = (dishIndex) => {
    const { [dishIndex]: dish } = data.data;
    props.navigation.navigate(AppRoute.DISHES_DETAILS, { dish });
  };

  const renderDish = ({ item: { title, recipe, duration } }) => (
    <ListItem style={styles.item} onPress={navigateDishDetails}>
      <Text category="s1">{title}</Text>
      <ProgressBar
        style={styles.itemProgressBar}
        progress={duration}
        text={`${duration} min`}
      />
    </ListItem>
  );

  return (
    <Layout style={styles.container}>
      {isLoading && <Text>Loading ...</Text>}
      {error && <Text>Failed: {JSON.stringify(error)}</Text>}
      {data && (
        <List style={styles.list} data={data.data} renderItem={renderDish} />
      )}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8
  },
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  },
  itemProgressBar: {
    width: '80%',
    marginVertical: 12
  }
});
