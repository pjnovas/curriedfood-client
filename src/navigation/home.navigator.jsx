import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileNavigator } from './profile.navigator';
import { AppRoute } from './app-routes';
import { AboutScreen, HomeTabBar } from '../scenes/home';

import { DishDetailsScreen, DishesScreen } from '../scenes/dishes';
import { HomeIcon, ShoppingCartIcon, DishesIcon } from '../assets/icons';

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeTabsNavigator = () => (
  <TopTab.Navigator tabBar={(props) => <HomeTabBar {...props} />}>
    <TopTab.Screen
      name={AppRoute.DISHES}
      component={DishesScreen}
      options={{ title: 'DISHES', tabBarIcon: DishesIcon }}
    />
    <TopTab.Screen
      name={AppRoute.KITCHEN}
      component={DishesScreen}
      options={{ title: 'KITCHEN', tabBarIcon: HomeIcon }}
    />
    <TopTab.Screen
      name={AppRoute.MARKET}
      component={DishesScreen}
      options={{ title: 'MARKET', tabBarIcon: ShoppingCartIcon }}
    />
  </TopTab.Navigator>
);

export const HomeNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={AppRoute.HOME} component={HomeTabsNavigator} />
    <Stack.Screen
      name={AppRoute.DISHES_DETAILS}
      component={DishDetailsScreen}
    />
    <Stack.Screen name={AppRoute.PROFILE} component={ProfileNavigator} />
    <Stack.Screen name={AppRoute.ABOUT} component={AboutScreen} />
  </Stack.Navigator>
);
