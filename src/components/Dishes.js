import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

// eslint-disable-next-line react/prop-types
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// eslint-disable-next-line react/prop-types
export default ({ list }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item }) => <Item title={item.Titulo} />}
      keyExtractor={(item) => item.id}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9fdd5',
    padding: 20
  },
  title: {
    fontSize: 20
  }
});
