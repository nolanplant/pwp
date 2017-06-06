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


const styles = StyleSheet.create({
  base:{
    flex:1,
    backgroundColor:'#eeeeee',
  },
  carouselWrap:{
    height:200,
    left:0,
    right:0,
    top:0,
    
    position:'absolute',
     backgroundColor:"blue"
  },
   carouselWrap2:{
    alignSelf: "stretch",
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain',
    // height:200,
    // left:0,
    // right:0,
    // top:0,
    
    // position:'absolute',
    // height:200,
    // left:0,
    // right:0,
    // top:0,
    // position:'absolute',
    backgroundColor:"red"
  },
  carouselWrap3: {
    height:200,
    left:0,
    right:0,
    top:0,
    
    position:'absolute',
  },
  carousel:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0
    //  flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain',
  },
  address:{
    margin:10,
    color:'#cccccc'
  },
  blurb:{
    margin:10,
    color:'#a2a2a2'
  },
  descriptionArea: {
    flex: 1,
    alignItems:'center',
    // justifyContent:'center',
    padding:10,
    backgroundColor: 'white',
    marginTop:200
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
    paddingBottom:90,
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

const {width} = Dimensions.get('window');

class WineryDetail extends Component {
  constructor(props){
    super(props);
    this.getDirections = this.getDirections.bind(this);
    this.callNumber = this.callNumber.bind(this);
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
        <View style={{height:200,
          left:0,
          right:0,
          top:0,
          position:'absolute',
          }} >
          <Carousel 
            style={{height:200,
          left:0,
          right:0,
          top:0,
          position:'absolute'
          }}

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
            wineryData.images.map((source, i)=>(
              <View  
              key={i} 
              style={{
                width,
                height:200
              }} >
                <Image  source={{uri:source}} style={{
                width,
                height:200
          }} />
              </View>
              ))
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