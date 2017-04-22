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
  TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
  imageView:{
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 40,
    width: 30
  }
});  

class WineMapMarker extends Component {
  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(){
    const {handlePress, wineryData} = this.props;
    handlePress(wineryData);
  }
  render(){
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        >
        <Image source={ this.props.isSelected ? require("../../images/pin-highlight.png") :
          require("../../images/pin.png")}
          style={styles.imageView}
        />
      </TouchableOpacity>
    );
  }
}

export default class WineMapView extends Component {
  constructor(props){
    super(props);
    this.moveToWinery = this.moveToWinery.bind(this);
  }
  moveToWinery(wineryData){
    const { region } = this.props;
    const { latitudeDelta, longitudeDelta } = region;
    const { latlng } = wineryData;
    this.mapNode.animateToRegion({
      ...latlng, 
      latitudeDelta, 
      longitudeDelta 
    }, 300);
    this.props.selectWinery(wineryData);
  }
  render() {

    return (
      <MapView
        region={this.props.region}
        initialPosition={this.props.initialPosition}
        style={{ flex: 1 }}
        onRegionChangeComplete={this.props.setCurrentLocation}
        ref={mapNode => this.mapNode = mapNode}
        showsMyLocationButton={true}
      >
      { this.props.shouldRenderMarkers && this.props.locations.map((marker, index) => {
        return (
            <MapView.Marker
              coordinate={marker.latlng}
              key={index}
              >
             <WineMapMarker 
              wineryData={marker}
              handlePress={this.moveToWinery}
              isSelected={this.props.selectedWineryTitle === marker.title}
             />
            </MapView.Marker>
          ); })}
      </MapView>
    );
  }
}


