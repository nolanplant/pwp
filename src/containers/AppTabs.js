import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import RegionsList from '../components/RegionsList';
import WineMapView from '../components/WineMapView';
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
    screen: WineMapView,
    path: 'wine_map'
  },

  Profile: {
    screen: Profile,
    path: 'profile'
  }
},
TabNavigatorConfig
);

