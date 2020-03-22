import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

// eslint-disable-next-line react/prop-types
export default ({ count, setCount }) => (
  <View style={styles.container}>
    <Text style={styles.count}>Your count is {count}</Text>
    <Button onPress={() => setCount(count + 1)} title="Sum" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
