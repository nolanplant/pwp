import React, {Component} from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import WineMapView from '../components/WineMapView';
import { getUsersLocation, setMapLocation } from '../actions/mapActions';

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
  constructor(props){
    super(props);
    this.setWineryLocation = this.setWineryLocation.bind(this);
  }
  componentDidMount(){
    this.props.getUsersLocation();
  }
  setWineryLocation({ latitude, longitude }){
    const { setMapLocation } = this.props;
    setMapLocation({ 
      latitude, 
      longitude, 
      latitudeDelta: 0.8,
      longitudeDelta: 0.8 
    });
  }
  render() {
    return (
       <WineMapView
        locations={this.props.locations}
        initialPosition={this.props.initialPosition}
        setCurrentLocation={this.props.setMapLocation}
        onWineryPress={this.setWineryLocation}
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
  setMapLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(WineMapContainer);
