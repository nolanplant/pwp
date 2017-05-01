import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import { LOCATION_LIST } from '../../data/locations';
import RegionItem from './RegionItem';
import {Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  base: {
    flex:1
  },
  topMenuBg: {
    backgroundColor: '#eeeeee',
    height: 65
  }
});

export default class RegionsList extends Component {
  static navigationOptions = {
    tabBar: {
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ focused }) => {
        return (
          <Icon
            name={"home"}
            color={focused ? '#b88d2c' : '#999c9e'}
            size={20}
          />);
      },  
     
    }
  }
  render(){
    return (
      <View style={styles.base}>
      <View style={styles.topMenuBg}/>
      <ScrollView>
      {  
        LOCATION_LIST.map((loc, index)=>{
          return (
            <RegionItem 
              isFirst={index===0} 
              isLast={index===LOCATION_LIST.length-1}
              stackNav={this.props.screenProps.stackNav} 
              key={index} 
              {...loc} />
          );
        })
      }
      </ScrollView>
      </View>
      );
  }
}        