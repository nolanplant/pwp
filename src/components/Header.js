import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: width,
    height:60,
    position:'absolute',
    zIndex:1,
    top:0,
    left:0,
    opacity:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  homeButton:{
    borderRadius:50,
    height:40,
    width:40,
    marginLeft:15,
    marginTop:20
  },
  mainIcon: {
   height:40,
   width:40
  },
  menuButton: {
   marginRight: 15,
   marginTop:20,
   height:45,
   width:45,
  },
  menu:{
    top:0,
    left:0,
    height:45,
    width:45
  }
});

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.homeButton} 
          onPress={()=>{console.log('hello')}}
          >
        <Image style={styles.mainIcon} source={require('../../images/main-logo.png')} />
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.menuButton}
          onPress={this.props.onMenuClick}
          >
          <Image style={styles.menu} source={require('../../images/menu.png')} />
        </TouchableHighlight>  
      </View>
    );
  }
}