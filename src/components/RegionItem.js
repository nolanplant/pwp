import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {LOCATION_DETAIL} from '../../constants'

const getStyles = ({isFirst, isLast}) => {
  return StyleSheet.create({
    locationItem: {
      flex: 1,
      alignItems: 'stretch',
      borderTopWidth: isFirst ? 68 : 4,
      borderBottomWidth:isLast ? 8 : 4,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderColor: 'rgb(238, 238, 238)'
    },
    image: {
      justifyContent: 'center',
      alignItems:'center',
      flex: 1,
      height: 200, 
      width: null
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'rgb(238, 238, 238)'
    },
    subText:{
      color: 'rgb(238, 238, 238)'
    },
    textContain:{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }
  });
}

export default class LocationItem extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.parentNav.push({
      name: LOCATION_DETAIL,
      id: this.props.id,
      title: this.props.title
    })
  }
  render(){
    const styles = getStyles(this.props);
    return (
      <TouchableHighlight style={styles.locationItem} onPress={this.handleClick}>
       <Image source={this.props.image} style={styles.image} >
          <View style={styles.textContain}>
            <Text style={styles.text}>
              { this.props.title }
            </Text>
            <Text style={styles.subText}>
              { this.props.sub }
            </Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
}
