import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps';
import Strings from '../../constants/Strings';
import { mapStyles } from '../../data/mapStyles';

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class WineMapView extends Component {
  render() {
    return (
      <MapView
        region={this.props.initialPosition}
        style={{flex:1}}
        // customMapStyle={mapStyles}
        // provider={PROVIDER_GOOGLE}
        >
      { this.props.locations.map((marker, index) => {
          return (
            <MapView.Marker
              coordinate={marker.latlng}
              key={index}
            >
              <Image source={require('../../images/pin.png')} 
              style={{
                justifyContent: 'center',
                alignItems:'center',
                flex: 1,
                height: 40,
                width:30
              }}
              />
            </MapView.Marker>
          )})}
      </MapView>
    );
  }
}