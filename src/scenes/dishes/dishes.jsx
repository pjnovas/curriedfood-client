import React from 'react';
import { useAxiosRetry } from 'use-axios-hooks';
import { Layout, StyleService, Text } from '@ui-kitten/components';
import DishList from './dish-list';

// import Config from 'react-native-config'; >>> DOES NOT WORK WITH EXPO + RN 0.61
import Config from '../../config';

const DISHES_URI = `${Config.API_URL}/dishes`;

export const DishesScreen = () => {
  const [{ data, isLoading, error }] = useAxiosRetry(DISHES_URI, {
    retryCount: 5,
    retryInterval: 2000
  });

  return (
    <Layout style={styles.container}>
      {isLoading && <Text>Cargando ...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {data && <DishList data={data.data} />}
    </Layout>
  );
};

const styles = StyleService.create({
  container: {
    flex: 1
  }
});
