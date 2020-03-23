import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

// eslint-disable-next-line react/prop-types
const Item = ({ Titulo, Porciones }) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {Titulo} ({Porciones || '-'})
    </Text>
  </View>
);

// eslint-disable-next-line react/prop-types
export default ({ list }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item }) => <Item {...item} />}
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
    padding: 20,
    marginVertical: 5
  },
  title: {
    fontSize: 20
  }
});
