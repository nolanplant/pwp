import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import { LOCATION_LIST } from '../../data/locations';
import RegionItem from './RegionItem';
import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default class RegionsList extends Component {
  static navigationOptions = {
    tabBar: {
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ focused }) => {
        return (
          <Image 
            style={styles.icon}
            source={focused ? require('../../images/home_highlighted.png') : require('../../images/home.png')}
          />);
      },  
     
    }
  }
  render(){
    return (
      <ScrollView>
      {  
        LOCATION_LIST.map((loc, index)=>{
          return (
            <RegionItem 
              isFirst={index===0} 
              isLast={index===LOCATION_LIST.length-1}
              parentNav={this.props.parentNav} 
              key={index} 
              {...loc} />
          );
        })
      }
      </ScrollView>);
  }
}        