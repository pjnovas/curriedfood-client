import React from 'react';
import { Divider, Tab, TabBar } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import {
  SafeAreaLayout,
  SaveAreaInset
} from '../../components/safe-area-layout.component';
import { Toolbar } from '../../components/toolbar.component';
import { UserIcon, InfoIcon, LogoutIcon, MenuIcon } from '../../assets/icons';

const menu = [
  { title: 'About', icon: InfoIcon },
  { title: 'Profile', icon: UserIcon },
  { title: 'Log Out', icon: LogoutIcon }
];

export const HomeTabBar = (props) => {
  const onMenuItemSelect = (index) => {
    const { [index]: selectedItem } = menu;

    switch (selectedItem.title) {
      case 'Log Out':
        props.navigation.navigate(AppRoute.AUTH);
        break;
      default:
        props.navigation.navigate(selectedItem.title);
        break;
    }
  };

  const onTabSelect = (index) => {
    const selectedTabRoute = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  const createNavigationTabForRoute = (route) => {
    const { options } = props.descriptors[route.key];
    return (
      <Tab key={route.key} title={options.title} icon={options.tabBarIcon} />
    );
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title="Curried Food"
        onMenuItemSelect={onMenuItemSelect}
        menu={menu}
        backIcon={MenuIcon}
      />
      <TabBar selectedIndex={props.state.index} onSelect={onTabSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </TabBar>
      <Divider />
    </SafeAreaLayout>
  );
};
