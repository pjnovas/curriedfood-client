import React from 'react';
import { List, StyleService } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import { useNavigateTo } from '../../hooks/navigation';
import DishListItem from './dish-list-item';

const DishList = (props) => {
  const openDetails = useNavigateTo(AppRoute.DISHES_DETAILS);

  return (
    <List
      style={styles.list}
      renderItem={({ item }) => (
        <DishListItem
          style={styles.item}
          onPress={(i) => openDetails({ dish: props.data[i] })}
          {...item}
        />
      )}
      {...props}
    />
  );
};

const styles = StyleService.create({
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12
  }
});

export default DishList;
