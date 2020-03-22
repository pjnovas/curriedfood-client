import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DishesScreen from './containers/DishesScreen';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DishesScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
