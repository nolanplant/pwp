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
import TextSizeControls from '../components/TextSizeControls';
import { setFontSizeToolBarState } from '../actions/textSizeControlsActions'
import { SMALL_FONT, MEDIUM_FONT, LARGE_FONT } from '../constants';

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
  getDirections: {justifyContent:"center", alignItems: "center"},
  textControlsStyles: {flexDirection:'row', justifyContent:'flex-end', flex:1, paddingTop:5, paddingRight:15} 
});


const getDisplaySize = (size, extra=0)=> {
  switch (size){
    case MEDIUM_FONT:
      return 20 + extra;
    case LARGE_FONT:
      return 24 + extra;
    case SMALL_FONT:
      return 14 + extra;
    default:
      return Math.max(extra, 10); 
  }
}

const getFontSize = (size, extra=0)=> ({ fontSize:getDisplaySize(size, extra) });


const {width} = Dimensions.get('window');

class WineryDetail extends Component {
  constructor(props){
    super(props);
    this.getDirections = this.getDirections.bind(this);
    this.callNumber = this.callNumber.bind(this);
    this._handleLayout = this._handleLayout.bind(this);
    this.closeToolBar = this.closeToolBar.bind(this);
    this.state = {
      width
    }
  }
  getDirections(){
    this.closeToolBar();
    const {navigation, usersLocation, getDirectionsToWinery } = this.props;
    const wineryData = navigation.state.params.details;
    getDirectionsToWinery(wineryData.latlng, usersLocation);
  }
  callNumber(){
    this.closeToolBar();
    const {navigation } = this.props;
    const wineryData = navigation.state.params.details;
    const { number } = wineryData;
    if(number){
      callNumber(number);
    }
  }
  // hack to get carousel component to work with screen changes 
  _handleLayout(event){
    this.setState({
        width: event.nativeEvent.layout.width
    });
  }
  closeToolBar(){
    if(this.props.displaySizeToolbarIsShowing){
      //hide toolbar if it's open on scroll
      this.props.setFontSizeToolBarState(false);
    }
  }
  render() {
    const {displayFontSize, navigation} = this.props;
    const wineryData = navigation.state.params.details

    return (
      <ScrollView style={styles.base}
        onScroll={this.closeToolBar}
        >
        <View 
          onLayout={this._handleLayout}
          style={{height:200,
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
                width: this.state.width, // note: could not get absolute or flex sizing to work with component on ios and Android
                height:200
              }} >
                <Image  source={{uri:source}} style={{
                width: this.state.width,
                height:200
          }} />
              </View>
              ))
           }
          </Carousel>
          <Text style={styles.value}>{`$${Math.round(+wineryData.maplist_val)} VALUE`}</Text>
        </View>

        <View style={styles.descriptionArea}>
          <Text style={[styles.centerText, styles.address, getFontSize(displayFontSize)]} >{wineryData.address}</Text>
          <Text style={[styles.centerText,styles.blurb, getFontSize(displayFontSize)]} >{wineryData.description}</Text>
          <View style={styles.rowArea}>

            <View style={styles.numberArea}>
            <TouchableOpacity onPress={this.callNumber}>
              <View style={styles.phoneArea}>
                <Icon name="phone" size={getDisplaySize(displayFontSize, 2)} color="#999c9e" />
                <Text style={[styles.centerText, getFontSize(displayFontSize)]}>{wineryData.maplist_telephone}</Text>
              </View>
            </TouchableOpacity>
            </View>
            
            <View style={styles.directionsArea}>
              <TouchableOpacity onPress={this.getDirections}>
                <View style={styles.getDirections}>
                  <Icon name="map-o" size={getDisplaySize(displayFontSize, 2)} color="#999c9e" />
                  <Text style={[styles.centerText, getFontSize(displayFontSize)]} >{Strings.DIRECTIONS}</Text>
                </View>  
              </TouchableOpacity>  
            </View>

          </View>
        </View>
        <TextSizeControls styles={styles.textControlsStyles} />
        <Text style={[styles.title, getFontSize(displayFontSize, 10)]} >{wineryData.title}</Text>
        <Text style={[styles.aboutUs, getFontSize(displayFontSize)]} >{wineryData.maplist_aboutUs}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  // const {
  //  currentWinery
  // } = state.wineriesReducer;
  const {
    usersLocation
  } = state.mapReducer;
  const {
    displayFontSize,
    displaySizeToolbarIsShowing,
  } = state.textSizeControlsReducer;
  return {
    //currentWinery,
    usersLocation,
    displayFontSize,
    displaySizeToolbarIsShowing
  };
}

const mapDispatchToProps = {
  getDirectionsToWinery,
  setFontSizeToolBarState
};

export default connect(mapStateToProps, mapDispatchToProps)(WineryDetail);