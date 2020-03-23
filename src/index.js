import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import DishesScreen from './containers/DishesScreen';

export const FacebookIcon = () => <Icon name="facebook" />;

export default class App extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Button primary icon={FacebookIcon}>
          HOLA
        </Button>
        {/* <DishesScreen /> */}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
