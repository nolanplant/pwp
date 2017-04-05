import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import { toggleDrawer } from '../actions/homeActions';

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor:'black',
    justifyContent: 'center'
  },
  mainIcon: {
   height:40,
   width:150,
   marginLeft:15,
   resizeMode: 'contain',
  },
  menu: {
   marginRight: 25
  },
  menuItemView:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
});

class MenuIcon extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.header} 
        onPress={this.props.toggleDrawer}
        >
        <View style={styles.menuItemView}>
          <SvgUri width="20" height="20" style={styles.menu} source={require('../../images/menu-button.svg')} />
        </View>
      </TouchableHighlight>  
    );
  }
}


export default MenuIcon;