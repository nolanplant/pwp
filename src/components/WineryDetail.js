import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails } from '../actions/wineriesActions';
import Carousel from 'react-native-carousel';

const styles = StyleSheet.create({
  base:{
    flex:1
  },
  carouselWrap:{
    width: 375,
    flex: 1,
    backgroundColor:'green',
    position:'relative'
  },
  backArrow: {
    flex: 1
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
    backgroundColor:'blue'
  },
  description: {
    flex: 1
  } 
});

class WineryDetail extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.title}`,
    header: ({goBack})=>({ 
      visible: true,
      titleColor: '#b88d2c',
      titleStyle: {
        color: 'white'
      },
      style: {
        backgroundColor: '#b88d2c'
      },
      left: (
        <TouchableHighlight 
          onPress={ ()=>{ goBack() } }
          >
          <Image
            style={styles.backArrow}
            source={require('../../images/back-arrow.png')}
          />
        </TouchableHighlight>)
    })
  };
  constructor(props){
    super(props);
    this.state = {
      shouldPlay: true
    };
  }
  addWineryImage(source, i){
    return (
      <View style={styles.imageContain} key={i}>
        <Image source={{uri:source}} style={styles.image} />
      </View>);
  }
  render() {
    const wineryData = this.props.navigation.state.params.details
    return (
      <View style={styles.base}>
      <View style={styles.carouselWrap} >
        <Carousel width={375}
          hideIndicators={false} 
          indicatorColor={"#ffffff"} 
          indicatorSize={25} 
          indicatorSpace={10} 
          inactiveIndicatorColor={"#dedede"} 
          indicatorOffset={20} 
          indicatorAtBottom={true}
          animate={true}//this.state.shouldPlay} 
          delay={2500} // Set Animation delay between slides
          loop={true}
          >
         {
          wineryData.images.map(this.addWineryImage)
         }
        </Carousel>
      </View>
        <View style={styles.description}>
            <Text >{wineryData.address}</Text>
            <Text >{"hello"}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
   currentWinery
  } = state.wineriesReducer;
  return {
    currentWinery
  };
}

export default connect(mapStateToProps)(WineryDetail);