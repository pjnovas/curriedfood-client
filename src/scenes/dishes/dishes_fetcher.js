import React from 'react';
import { useAxiosRetry } from 'use-axios-hooks';

import { StyleSheet, View, Text } from 'react-native';
import Dishes from '../components/Dishes';

const DISHES_URI = 'http://192.168.1.4:1337/comidas';

export default () => {
  const [{ data, isLoading, error }] = useAxiosRetry(DISHES_URI, {
    retryCount: 5,
    retryInterval: 2000
  });

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading ...</Text>}
      {error && <Text>Failed: {JSON.stringify(error)}</Text>}
      {data && <Dishes list={data.data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
