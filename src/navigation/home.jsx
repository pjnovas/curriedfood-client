import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ProfileNavigator } from './profile';
import { AppRoute } from './app-routes';
import { AboutScreen, HomeTabBar } from '../scenes/home';

import { DishDetailsScreen, DishesScreen } from '../scenes/dishes';
import { KitchenScreen } from '../scenes/kitchen';
import { ShoppingListScreen } from '../scenes/market';

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeTabsNavigator = () => (
  <TopTab.Navigator
    initialRouteName={AppRoute.DISHES}
    backBehavior="none"
    tabBar={(props) => <HomeTabBar {...props} />}
  >
    <TopTab.Screen
      name={AppRoute.DISHES}
      component={DishesScreen}
      options={{ title: 'COMIDAS', tabBarIcon: 'nutrition' }}
    />
    <TopTab.Screen
      name={AppRoute.KITCHEN}
      component={KitchenScreen}
      options={{ title: 'COCINA', tabBarIcon: 'fridge-outline' }}
    />
    <TopTab.Screen
      name={AppRoute.MARKET}
      component={ShoppingListScreen}
      options={{ title: 'SUPER', tabBarIcon: 'cart-outline' }}
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
