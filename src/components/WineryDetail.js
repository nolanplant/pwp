import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StyleSheet, ScrollView } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails } from '../actions/wineriesActions';
import Carousel from 'react-native-carousel';
import Strings from '../../constants/Strings';
import { getDirectionsToWinery } from '../actions/mapActions';
import { callNumber } from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
// import getDirections from 'react-native-google-maps-directions'

const styles = StyleSheet.create({
  base:{
    flex:1,
    backgroundColor:'#eeeeee'
  },
  carouselWrap:{
    width: 375,
    flex: 1,
    position:'relative'
  },
  address:{
    margin:10,
    color:'#cccccc'
  },
  blurb:{
    margin:10,
    color:'#a2a2a2'
  },
  image:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imageContain:{
    position:"relative",
    flex:1,
    width:375,
    height:200,
  },
  descriptionArea: {
    flex: 1,
    alignItems:'center',
    // justifyContent:'center',
    padding:10,
    backgroundColor: 'white'
  },
  centerText:{
    textAlign:'center',
    color:'#cccccc'
  },
  rowArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'white',
    marginTop:10,
    marginBottom:10
  },
  phoneArea:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  directionsArea:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  numberArea:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  aboutUs:{
    flex:1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:15,
    paddingBottom:10,
    color:'#999c9e',
    fontWeight:'bold',
    fontSize:14
  },
  title:{
    flex:1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:30,
    fontSize:20,
    fontWeight:'bold',
    color:'#999c9e'
  },
  value: {
    padding: 5,
    position: 'absolute',
    bottom: 0,
    backgroundColor:'#b88d2c',
    right: 0,
    color: 'white',
    fontWeight: 'bold'
  },
  getDirections: {justifyContent:"center", alignItems: "center"} 
});

class WineryDetail extends Component {
  constructor(props){
    super(props);
    this.getDirections = this.getDirections.bind(this);
    this.callNumber = this.callNumber.bind(this);
  }
  addWineryImage(source, i){
    return (
      <View  style={styles.imageContain} key={i}>
        <Image source={{uri:source}} style={styles.image} />
      </View>);
  }
  getDirections(){
    const {navigation, usersLocation, getDirectionsToWinery } = this.props;
    // todo: clean this up possibly use current winery here
    const wineryData = navigation.state.params.details;
    getDirectionsToWinery(wineryData.latlng, usersLocation);
  }
  callNumber(){
    const {navigation } = this.props;
    // current winery ?
    const wineryData = navigation.state.params.details;
    const { number } = wineryData;
    if(number){
      callNumber(number);
    }
  }
  render() {
    const wineryData = this.props.navigation.state.params.details
    return (
      <ScrollView style={styles.base}>

        <View style={styles.carouselWrap} >

          <Carousel 
            width={375}
            hideIndicators={false} 
            indicatorColor={"#ffffff"} 
            indicatorSize={25} 
            indicatorSpace={10} 
            inactiveIndicatorColor={"#dedede"} 
            indicatorOffset={20} 
            indicatorAtBottom={true}
            animate={true}
            delay={2500} 
            loop={false}
            >
           {
            wineryData.images.map(this.addWineryImage)
           }
          </Carousel>
          <Text style={styles.value}>{`$${Math.round(+wineryData.maplist_val)} VALUE`}</Text>
        </View>

        <View style={styles.descriptionArea}>
          <Text style={[styles.centerText, styles.address]} >{wineryData.address}</Text>
          <Text style={[styles.centerText,styles.blurb]} >{wineryData.description}</Text>
          <View style={styles.rowArea}>

            <View style={styles.numberArea}>
            <TouchableOpacity onPress={this.callNumber}>
              <View style={styles.phoneArea}>
                <Icon name="phone" size={16} color="#999c9e" />
                <Text style={styles.centerText}>{wineryData.maplist_telephone}</Text>
              </View>
            </TouchableOpacity>
            </View>
            
            <View style={styles.directionsArea}>
              <TouchableOpacity onPress={this.getDirections}>
                <View style={styles.getDirections}>
                  <Icon name="map-o" size={16} color="#999c9e" />
                  <Text style={styles.centerText} >{Strings.DIRECTIONS}</Text>
                </View>  
              </TouchableOpacity>  
            </View>

          </View>
        </View>
        <Text style={styles.title} >{wineryData.title}</Text>
        <Text style={styles.aboutUs} >{wineryData.maplist_aboutUs}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
   currentWinery
  } = state.wineriesReducer;
  const {
    usersLocation
  } = state.mapReducer;
  //todo: add selector here
  return {
    currentWinery,
    usersLocation
  };
}

const mapDispatchToProps = {
  getDirectionsToWinery
};

export default connect(mapStateToProps, mapDispatchToProps)(WineryDetail);