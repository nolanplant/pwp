import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import MapView from "react-native-maps";
import Strings from "../../constants/Strings";
import { mapStyles } from "../../data/mapStyles";

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";

const styles = StyleSheet.create({
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 40,
    width: 30
  },
  map: { flex: 1 }
});

class WineMapMarker extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      pressed: false
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handlePress(e) {
    e.stopPropagation();
    console.log('i am here')
    const { handlePress, wineryData } = this.props;
    this.setState({ pressed: true });
    this.timer = setTimeout(() => {
      this.setState({ pressed: false });
    }, 500);
    handlePress(wineryData);
  }
  render() {
    return (
       <MapView.Marker
          coordinate={this.props.wineryData.latlng}
          key={this.props.wineryData.id}
          onPress={this.handlePress}
          image={this.props.isSelected || this.state.pressed ? require("../../images/pin-highlight.png") :
            require("../../images/pin.png")}
        />
    );
  }
}

export default class WineMapView extends Component {
  constructor(props) {
    super(props);
    this.moveToWinery = this.moveToWinery.bind(this);
  }
  moveToWinery(wineryData) {
    const { region } = this.props;
    const { latitudeDelta, longitudeDelta } = region;
    const { latlng } = wineryData;
    this.mapNode.animateToRegion({
      ...latlng,
      latitudeDelta,
      longitudeDelta
    }, 300);
    console.log('i am here!!!____>>>>>>>>>', wineryData)
    this.props.selectWinery(wineryData);
  }
  stopPropagation(e) {
    
    //e.stopPropagation();
  }
  render() {
    console.log('rendering map')
    return (
      <MapView
        onPress={this.props.onMapPress}
        region={this.props.region}
        initialPosition={this.props.initialPosition}
        style={styles.map}
        onRegionChangeComplete={this.props.setCurrentLocation}
        ref={mapNode => this.mapNode = mapNode}
        showsMyLocationButton
      >
      { this.props.locations.map((marker, index) => {
        return (
             <WineMapMarker
               wineryData={marker}
               handlePress={this.moveToWinery}
               isSelected={marker.isSelected}
             />
          ); })}
      </MapView>
    );
  }
}

