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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backArrow: {
    flex: 1
  },
  image:{
    position:"absolute",
    //resizeMode: 'cover',
    //width:375
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex:1
  },
  imageContain:{
    flex:1,
    position:'relative',
    width:375
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
    return <View style={styles.imageContain}><Image source={{uri:source}} style={styles.image} key={i}/></View>
  }
  render() {
    const wineryData = this.props.navigation.state.params.details
    return (
      <View style={styles.base}>
      <View style={styles.carouselWrap} >
        <Carousel
          hideIndicators={false} 
          indicatorColor="#ffffff" 
          indicatorSize={25} 
          indicatorSpace={10} 
          inactiveIndicatorColor="#dedede" 
          indicatorOffset={250} 
          indicatorAtBottom={true}
          animate={true}//this.state.shouldPlay} 
          // delay={1500} // Set Animation delay between slides
          // loop={true}
          >
         {
          wineryData.images.map(this.addWineryImage)
         }
        </Carousel>
      </View>
        <View style={styles.description}>
            <Text >wineryData</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isFetching,
    wineries
  } = state.wineriesReducer;
  return {
    wineries,
    isFetching
  };
}

const mapDispatchToProps = {
  fetchWineries,
  setWineRegionDetails
}

//export default connect(mapStateToProps, mapDispatchToProps)(WineriesByRegionContainer);
export default WineryDetail;