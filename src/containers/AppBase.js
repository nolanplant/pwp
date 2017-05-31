import HomeScreen from "../components/HomeScreen";
import WineriesByRegion from "../components/WineriesByRegion";
import WineryDetail from "../components/WineryDetail";
import WineriesByRegionContainer from "./WineriesByRegionContainer";
import MenuItemStaticPage from "./MenuItemStaticPage";
import { StackNavigator } from "react-navigation";
import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
 backArrow: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  }
});

export default AppBase = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  RegionList: {
    path: "region",
    screen: WineriesByRegionContainer,
    navigationOptions: ({navigation}) => ({
    title: `${navigation.state.params.title}`,
      //titleColor: 'rgb(184, 141, 44)',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: 'rgb(68, 68, 68)'
    },
    headerLeft: (
      <TouchableOpacity 
        onPress={ ()=> navigation.goBack() }
        style={styles.backArrow}
        >
        <Icon
          name="chevron-left"
          color="white"
          size={18}
        />
      </TouchableOpacity>)
    })
  },
  WineryDetail: {
    path: "winery/:title",
    screen: WineryDetail,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`,
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#b88d2c'
      },
      headerLeft: (
        <TouchableOpacity 
          onPress={ ()=> navigation.goBack() }
          style={styles.backArrow}
          >
          <Icon
            name="chevron-left"
            color="white"
            size={18}
          />
        </TouchableOpacity>)
    })
  },
  MenuItemStaticPage: {
    path: "menu/:screen",
    screen: MenuItemStaticPage,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.screen}`,
      headerStyle: {
        backgroundColor: '#8d8d8d'
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <TouchableOpacity 
          onPress={ ()=> navigation.goBack() }
          style={styles.backArrow}
          >
          <Icon
            name="chevron-left"
            color="white"
            size={18}
          />
        </TouchableOpacity>)
    })  
  }
}, {
  headerMode: "screen"  
});
