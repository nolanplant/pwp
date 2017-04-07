import HomeScreen from "../components/HomeScreen";
import WineriesByRegion from "../components/WineriesByRegion";
import WineriesByRegionContainer from './WineriesByRegionContainer';
import { StackNavigator } from "react-navigation";
import React, { Component } from "react";
import { Text } from "react-native";

export default AppBase = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  RegionList: {
    path: "region/:name",
    screen: WineriesByRegionContainer
  }
}, {
  headerMode: "screen"
});
