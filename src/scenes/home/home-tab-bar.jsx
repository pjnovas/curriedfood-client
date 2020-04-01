import React from 'react';
import { TabBar } from 'react-native-tab-view';
// import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import { useAuth } from '../../context/auth-context';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout';
import { Toolbar } from '../../components/toolbar';

const menu = [
  { title: 'About', icon: 'information-outline' },
  { title: 'Profile', icon: 'account-outline' },
  { title: 'Salir', icon: 'exit-to-app' }
];

export const HomeTabBar = (props) => {
  const [, { signOut }] = useAuth();

  const onMenuItemSelect = (index) => {
    const { [index]: selectedItem } = menu;

    switch (selectedItem.title) {
      case 'Salir':
        signOut();
        break;
      default:
        props.navigation.navigate(selectedItem.title);
        break;
    }
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title="Curried Food"
        onMenuItemSelect={onMenuItemSelect}
        menu={menu}
      />
      <TabBar
        {...props}
        // indicatorStyle={{ backgroundColor: 'white' }}
        // style={{ backgroundColor: 'pink' }}
        getLabelText={({ route }) => {
          const { options } = props.descriptors[route.key];
          return options.title;
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = props.descriptors[route.key];
          return <Icon name={options.tabBarIcon} size={30} color={color} />;
        }}
      />
      <Divider />
    </SafeAreaLayout>
  );
};
