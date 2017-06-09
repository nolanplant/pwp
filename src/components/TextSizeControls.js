import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  base:{
    flex:1,
    position: 'absolute',
  },
  rowIcons: {
    background:'grey',
    padding: 2
    flexDirection:'row',
    flex:1
  }
});

class TextSizeControls extends Component {
  constructor(){

  }
  render(){
    return (
    <View style={styles.base}>
      <TouchableHighlight>
        <Image source={require('')} />
      </TouchableHighlight>
      <View style={styles.rowIcons}>
      <TouchableHighlight><Icon name="font" size={12} color="black"/></TouchableHighlight>
      <TouchableHighlight><Icon name="font" size={14} color="black" /></TouchableHighlight>
      <TouchableHighlight><Icon name="font" size={16} color="black" /></TouchableHighlight>
      </View>
    </View>)
  }
} 

export default TextSizeControls;