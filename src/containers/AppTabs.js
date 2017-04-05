import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import RegionsList from '../components/RegionsList';
import WineMapContainer from './WineMapContainer';
import Profile from '../components/Profile';

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  //animationEnabled: true,
  lazyLoad: true,
  tabBarOptions:  {
    showLabel: false,
    style: {
      backgroundColor: 'white'
    }
  }  
};

export default AppTabs = TabNavigator({
  Home: {
    screen: RegionsList,
    path: 'wine_regions',
  },

  WineMap: {
    screen: WineMapContainer,
    path: 'wine_map'
  },

  Profile: {
    screen: Profile,
    path: 'profile'
  }
},
TabNavigatorConfig
);

