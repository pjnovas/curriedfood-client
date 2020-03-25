import React from 'react';
import {
  Input,
  Layout,
  List,
  ListItem,
  StyleService,
  Text,
  useStyleSheet
} from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon } from '../../assets/icons';
import { Dish } from '../../data/dish.model';

const allDishes = [
  Dish.mocked0(),
  Dish.mocked1(),
  Dish.mocked2(),
  Dish.mocked0(),
  Dish.mocked1(),
  Dish.mocked2(),
  Dish.mocked0(),
  Dish.mocked1(),
  Dish.mocked2()
];

export const DishesScreen = (props) => {
  const [dishes, setDishes] = React.useState(allDishes);
  const [query, setQuery] = React.useState('');
  const styles = useStyleSheet(themedStyles);

  const onChangeQuery = (query) => {
    const nextDishes = allDishes.filter((dish) =>
      dish.title.toLowerCase().includes(query.toLowerCase())
    );

    setDishes(nextDishes);
    setQuery(query);
  };

  const navigateDishDetails = (dishIndex) => {
    const { [dishIndex]: dish } = dishes;
    props.navigation.navigate(AppRoute.DISHES_DETAILS, { dish });
  };

  const renderDish = ({ item }) => (
    <ListItem style={styles.item} onPress={navigateDishDetails}>
      <Text category="s1">{item.title}</Text>
      <Text appearance="hint" category="c1">
        {item.description}
      </Text>
      <ProgressBar
        style={styles.itemProgressBar}
        progress={item.progress}
        text={`${item.progress}%`}
      />
    </ListItem>
  );

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.filterInput}
        placeholder="Search"
        value={query}
        icon={SearchIcon}
        onChangeText={onChangeQuery}
      />
      <List style={styles.list} data={dishes} renderItem={renderDish} />
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
    width: '50%',
    marginVertical: 12
  }
});
