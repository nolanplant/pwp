import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableHighlight, WebView, TouchableOpacity, Linking, TouchableWithoutFeedback, Dimensions, StyleSheet, ScrollView } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails } from '../actions/wineriesActions';
import Carousel from 'react-native-carousel';
import Strings from '../../constants/Strings';
import { getDirectionsToWinery } from '../actions/mapActions';

import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  base:{
    flex:1,
    backgroundColor:'transparent'
  },
  background:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  },
  backArrow: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  },
  pwp:{
    marginTop:20,
    height:50,
    width:150
  },
  video:{
    marginTop: 20,
    width:375,
    height:200
  },
  view:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  backgroundImage: {
    flex: 1,
    // position:'absolute',
    // top:0,
    // left:0,
    // right:0,
    // bottom:0,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  link:{
     flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row'
  },
  text: {
    marginTop: 20,
    padding:10, 
    textAlign:'center',
    color:'white'
  }
});

class MenuItemStaticPage extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.screen}`,
    header: ({goBack})=>({ 
      visible: true,
      // titleColor: 'white',
      titleStyle: {
        color: 'white',
      },
      style: {
        backgroundColor: '#8d8d8d'
      },
      left: (
        <TouchableOpacity 
          onPress={ ()=>{ goBack() } }
          style={styles.backArrow}
          >
          <Icon
            name="chevron-left"
            color="white"
            size={18}
          />
        </TouchableOpacity>)
    })
  };
  addWineryImage(source, i){
    return (
      <View  style={styles.imageContain} key={i}>
        <Image source={{uri:source}} style={styles.image} />
      </View>);
  }
  getDirections(){
    const {navigation, usersLocation, getDirectionsToWinery } = this.props;
    const wineryData = navigation.state.params.details;
    getDirectionsToWinery(wineryData.latlng, usersLocation);
  }
  render() {
    const wineryData = this.props.navigation.state.params.details
    return (
        <HowItWorks /> 
    );
  }
}

const HowItWorks = () => (
  <View style={styles.base} >
    <View style={styles.background}>
      <Image
        style={styles.backgroundImage} 
        source={require('../../images/background-image.png')}
      />
     </View> 
    <View style={styles.view}> 
      <Image
        style={styles.pwp} 
        source={require('../../images/pwp.png')} />  
      <View style={styles.video}>
      <WebView
        source={{uri: 'https://www.youtube.com/embed/-Q_I7IBLp9U'}}
        //javaScriptEnabled={true}
      />
      </View>
      <Text style={styles.text}>
        {Strings.ABOUT_PRIORITY_WINEPASS_MESSAGE}
      </Text>
      <TouchableHighlight 
        style={styles.link}
        // todo remove arrow fn and add link to constant
        onPress={()=>{Linking.openURL('http://prioritywinepass.com')}}
        >
        <Text style={styles.text}>
          prioritywinepass.com
        </Text>
      </TouchableHighlight>
    </View>
  </View>
);


export default MenuItemStaticPage;