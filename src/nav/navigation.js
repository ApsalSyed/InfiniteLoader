import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomePage from '../home/home';
import InfiniteScrollFlatList from '../scroll/infinite-scroll-flatlist';
import InfiniteScrollList from '../scroll/infinite-scroll-list';

const Stack = createStackNavigator();
const AppNavigation = () => {   
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="InfiniteScrollFlatLists" component={InfiniteScrollFlatList} />
        <Stack.Screen name="InfiniteScrollList" component={InfiniteScrollList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
