import React from 'react';
import get from 'lodash/get';
import { StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';

import Theme from 'theme';

import Icon from 'components/icon';
import { useAuth } from 'context/auth-context';
import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';
import { Toolbar } from 'components/toolbar';

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

  const getProp = (route, prop) =>
    get(props, `descriptors.${route.key}.options.${prop}`);

  const getLabelText = ({ route }) => getProp(route, 'title');
  const renderIcon = ({ route, color }) => (
    <Icon name={getProp(route, 'tabBarIcon')} size={30} color={color} />
  );

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title="Curried Food"
        onMenuItemSelect={onMenuItemSelect}
        menu={menu}
      />
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        getLabelText={getLabelText}
        renderIcon={renderIcon}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Theme.colors.text
  },
  tabBar: {
    backgroundColor: Theme.colors.primary
  }
});
