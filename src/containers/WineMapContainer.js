import React, {Component} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import WineMapView from '../components/WineMapView';
import { getUsersLocation, setMapLocation } from '../actions/mapActions';
import { WineryListItem } from '../components/WineriesByRegion';
import {fetchMoreWineryDetails} from '../actions/wineriesActions';

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
          <Image 
            style={styles.icon}
            source={focused ? require('../../images/map_highlighted.png') : require('../../images/map.png')}
          />);
      },  
     
    }
  }
  constructor(props){
    super(props);
    this.state = {
      data:null
    }
    this.setWineryLocation = this.setWineryLocation.bind(this);
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
  openWinery(details){
    const { title, id } = details;
    const { screenProps, fetchMoreWineryDetails } = this.props;
    screenProps.stackNav.navigate("WineryDetail", { title, details });
    if(!this.props.currentWinery || this.props.currentWinery.id !== id){
      fetchMoreWineryDetails(id)
    }
  }
  render(){
    return (
      <View style={styles.base}>
        <WineMapView style={styles.map}
          locations={this.props.locations}
          initialPosition={this.props.initialPosition}
          region={this.props.region}
          setCurrentLocation={this.props.setMapLocation}
          onWineryPress={this.setWineryLocation}
          selectWinery={(winery)=>{
              this.setState({data:winery})
            } 
          }
        />
        { this.state.data && (
            <WineryListItem
              style={styles.wineryDetail} 
              data={this.state.data}
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
    region
  } = state.mapReducer;
  return {
    locations,
    initialPosition,
    region
  };
}

const mapDispatchToProps = {
  getUsersLocation,
  setMapLocation,
  fetchMoreWineryDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(WineMapContainer);
