import React, { Component } from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";
import RegionsList from "../components/RegionsList";
import WineMapContainer from "./WineMapContainer";
import UserPageContainer from "./UserPageContainer";
import Icon from 'react-native-vector-icons/FontAwesome';


console.log(TabBarBottom)
const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  tabBarOptions: {
    swipeEnabled: true,
    lazyLoad: true,
    showLabel: false,
  }
};

export default AppTabs = TabNavigator({
  Home: {
    screen: RegionsList,
    path: "wine_regions",
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ focused }) => (
        <Icon
          name={"home"}
          color={focused ? '#b88d2c' : '#999c9e'}
          size={20}
        />)
    }  
  },
  WineMap: {
    screen: WineMapContainer,
    path: "wine_map",
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ focused }) => (
        <Icon
          name={"map-marker"}
          color={focused ? '#b88d2c' : '#999c9e'}
          size={20}
        />)
    }
  },

  Profile: {
    screen: UserPageContainer,
    path: "profile",
    navigationOptions: {
      showLabel: false,
      tabBarIcon: ({ focused }) => (
        <Icon
          name={"user"}
          color={focused ? '#b88d2c' : '#999c9e'}
          size={20}
        />) 
    }
  
  }
},
TabNavigatorConfig
);

