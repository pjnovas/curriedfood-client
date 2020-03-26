import React from 'react';
import {
  List,
  StyleService,
  Button,
  Divider,
  Layout
} from '@ui-kitten/components';
import IngredientListItem from './ingredient-list-item';
import { PeopleIcon } from '../../assets/icons';

const IngredientList = (props) => (
  <Layout style={{ flex: 1 }}>
    <Button
      style={styles.btn}
      appearance="ghost"
      status="basic"
      icon={PeopleIcon}
    >
      {`${props.dish.servings}`} Porciones
    </Button>
    <Divider />
    <List
      style={styles.list}
      renderItem={({ item }) => (
        <IngredientListItem style={styles.item} {...item} />
      )}
      {...props}
    />
  </Layout>
);

const styles = StyleService.create({
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  }
});

export default IngredientList;
