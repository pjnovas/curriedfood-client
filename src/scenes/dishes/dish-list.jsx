import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { AppRoute } from '../../navigation/app-routes';
import { useNavigateTo } from '../../hooks/navigation';
import DishDuration from './dish-duration';

const DishList = (props) => {
  const openDetails = useNavigateTo(AppRoute.DISHES_DETAILS);

  return (
    <ScrollView>
      {props.data.map((dish) => (
        <List.Item
          key={dish.id}
          title={dish.title}
          // left={(props) => <List.Icon {...props} icon="equal" />}
          right={() => <DishDuration duration={dish.duration} />}
          onPress={() => openDetails({ dish })}
        />
      ))}
    </ScrollView>
  );
};

export default DishList;
