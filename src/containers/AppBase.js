import HomeScreen from "../components/HomeScreen";
import WineriesByRegion from "../components/WineriesByRegion";
import WineryDetail from '../components/WineryDetail';
import WineriesByRegionContainer from './WineriesByRegionContainer';
import MenuItemStaticPage from './MenuItemStaticPage';
import { StackNavigator } from "react-navigation";
import React, { Component } from "react";
import { Text } from "react-native";

export default AppBase = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  RegionList: {
    path: "region",
    screen: WineriesByRegionContainer
  },
  WineryDetail:{
    path: "winery/:title",
    screen: WineryDetail
  },
  MenuItemStaticPage:{
    path: "menu/:screen",
    screen: MenuItemStaticPage
  }
}, {
  headerMode: "screen"
});
