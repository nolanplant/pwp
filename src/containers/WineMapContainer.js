import React, {Component} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import WineMapView from '../components/WineMapView';
import { getUsersLocation, setMapLocation, selectWineryOnMap } from '../actions/mapActions';
import { WineryListItem } from '../components/WineriesByRegion';
import {fetchMoreWineryDetails} from '../actions/wineriesActions';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  base:{
    flex:1
  },
  icon: {
    width: 26,
    height: 26,
  },
  wineryDetail:{
    position:'absolute',
    bottom: 30,
    width:375
  },
  map:{
    flex: 1
  }
});

class WineMapContainer extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ focused }) => {
        return (
          <Icon
            name={"map-marker"}
            color={focused ? '#b88d2c' : '#999c9e'}
            size={20}
          />);
      },  
     
    }
  }
  constructor(props){
    super(props);
    this.setWineryLocation = this.setWineryLocation.bind(this);
    this.clearSelectedWinery = this.clearSelectedWinery.bind(this);
    this.openWinery = this.openWinery.bind(this);
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
  clearSelectedWinery(){
    this.props.selectWineryOnMap(null)
  }
  openWinery(details){
    const { title, id } = details;
    const { screenProps, fetchMoreWineryDetails } = this.props;
    screenProps.stackNav.navigate("WineryDetail", { title, details });
    if(!this.props.currentWinery || this.props.currentWinery.id !== id){
      fetchMoreWineryDetails(id)
    }
  }
  render(){
    const { selectedWinery } = this.props;
    const selectedWineryTitle = selectedWinery && selectedWinery.title;
    return (
      <View style={styles.base}>
        <WineMapView style={styles.map}
          locations={this.props.locations}
          initialPosition={this.props.region}
          region={this.props.region}
          setCurrentLocation={this.props.setMapLocation}
          onWineryPress={this.setWineryLocation}
          selectWinery={this.props.selectWineryOnMap}
          selectedWineryTitle={selectedWineryTitle}
          shouldRenderMarkers={true}
          onMapPress={this.clearSelectedWinery}
        />
        { this.props.selectedWinery && (
            <WineryListItem
              style={styles.wineryDetail} 
              data={this.props.selectedWinery}
              onSelectWinery={this.openWinery}
            />
          )  
        }
        </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    locations,
    initialPosition,
    selectedWinery,
    region
  } = state.mapReducer;
  
  return {
    locations,
    initialPosition,
    selectedWinery,
    region
  };
}

const mapDispatchToProps = {
  getUsersLocation,
  setMapLocation,
  fetchMoreWineryDetails,
  selectWineryOnMap
}

export default connect(mapStateToProps, mapDispatchToProps)(WineMapContainer);
