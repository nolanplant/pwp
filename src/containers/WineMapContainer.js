import React, {Component} from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import WineMapView from '../components/WineMapView';
import { getUsersLocation, setUserLocation } from '../actions/mapActions';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  }
});

class WineMapContainer extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ focused }) => {
        return (
          <Image 
            style={styles.icon}
            source={focused ? require('../../images/map_highlighted.png') : require('../../images/map.png')}
          />);
      },  
     
    }
  }
  componentDidMount(){
    this.props.getUsersLocation();
  }
  render() {
    return (
       <WineMapView
        locations={this.props.locations}
        initialPosition={this.props.initialPosition}
        setCurrentLocation={this.props.setUserLocation}
       />
    );
  }
}

function mapStateToProps(state) {
  const {
    locations,
    initialPosition
  } = state.mapReducer;
  return {
    locations,
    initialPosition
  };
}

const mapDispatchToProps = {
  getUsersLocation,
  setUserLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(WineMapContainer);
