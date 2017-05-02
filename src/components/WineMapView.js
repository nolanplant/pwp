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
  imageView:{
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 40,
    width: 30
  },
  map: { flex: 1 }
});  

class WineMapMarker extends Component {
  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      pressed: false
    }
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  handlePress(){
    const {handlePress, wineryData} = this.props;
    this.setState({pressed: true});
    this.timer = setTimeout(()=>{
      this.setState({pressed:false})
    }, 500)
    handlePress(wineryData);
  }
  render(){
    return (
      <TouchableWithoutFeedback
        onPress={this.handlePress}
        >
        <Image source={ this.props.isSelected || this.state.pressed ? require("../../images/pin-highlight.png") :
          require("../../images/pin.png")}
          style={styles.imageView}
        />
      </TouchableWithoutFeedback>
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
  stopPropagation(e){
    e.stopPropagation();
  }
  render() {
    
    return (
      <MapView
        onPress={this.props.onMapPress}
        region={this.props.region}
        initialPosition={this.props.initialPosition}
        style={styles.map}
        onRegionChangeComplete={this.props.setCurrentLocation}
        ref={mapNode => this.mapNode = mapNode}
        showsMyLocationButton={true}
      >
      { this.props.locations.map((marker, index) => {
        return (
            <MapView.Marker
              coordinate={marker.latlng}
              key={index}
              onPress={this.stopPropagation}
              >
             <WineMapMarker 
              wineryData={marker}
              handlePress={this.moveToWinery}
              isSelected={marker.isSelected}
             />
            </MapView.Marker>
          ); })}
      </MapView>
    );
  }
}


