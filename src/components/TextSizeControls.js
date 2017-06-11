import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SMALL_FONT, MEDIUM_FONT, LARGE_FONT } from '../constants';
import { setDisplayFontSize, setFontSizeToolBarState } from '../actions/textSizeControlsActions';

const styles = StyleSheet.create({
  rowIcons: {
    marginTop:10,
    backgroundColor:'white',
    borderRadius:4,
    padding: 2,
    flexDirection:'row',
    flex:1,
    alignItems:'flex-end',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  iconsContainer: {
    position: 'absolute',
    zIndex:2,
    top:-60,
    right:5
  },
  caret:{
    position:'absolute',
    right: 25,
    bottom: -15,
    backgroundColor: 'transparent',
    zIndex:3
  },
  backgroundTouch: {position:'absolute', zIndex: 0, top:0,left:0, right:0, bottom:0, backgroundColor:'rgba(200,0,0,0.3)'},
  selectorIcon: {
    padding:10
  }
});

class TextSizeControls extends Component {
  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.selectSmallFont = this.selectSmallFont.bind(this);
    this.selectMediumFont = this.selectMediumFont.bind(this);
    this.selectLargeFont = this.selectLargeFont.bind(this);
    this.closeDrawerDelayDebounced = this.closeDrawerDelayDebounced.bind(this);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.props.setFontSizeToolBarState(false);
  }
  handlePress(){
    const { setFontSizeToolBarState, displaySizeToolbarIsShowing } = this.props;
    setFontSizeToolBarState(!displaySizeToolbarIsShowing);
  }
  closeDrawerDelayDebounced(){
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setFontSizeToolBarState(false)
    }, 1000);
  }
  selectSmallFont(){
    const {setDisplayFontSize} = this.props;
    setDisplayFontSize(SMALL_FONT)
    this.closeDrawerDelayDebounced();
  }
  selectMediumFont(){
    const {setDisplayFontSize} = this.props;
    setDisplayFontSize(MEDIUM_FONT);
    this.closeDrawerDelayDebounced();
  }
  selectLargeFont(){
    const {setDisplayFontSize} = this.props;
    setDisplayFontSize(LARGE_FONT);
    this.closeDrawerDelayDebounced();
  }
  render(){
    return (
    <View style={this.props.styles} 
      >
        <TouchableOpacity onPress={this.handlePress}>
          <Image 
            style={{height:30,width:30}} 
            source={require('../../images/resizer.png')} 
          />
        </TouchableOpacity>
        { this.props.displaySizeToolbarIsShowing && (
          <View style={styles.iconsContainer} >
            <Icon name="caret-down" size={30} color="white" style={styles.caret} />
            <View style={styles.rowIcons}>
              <TouchableOpacity style={styles.selectorIcon} onPress={this.selectSmallFont}>
                <Icon 
                  name="font" 
                  size={12} 
                  color={this.props.displayFontSize === SMALL_FONT ? "#007AFF" : "black" }
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectorIcon} onPress={this.selectMediumFont}>
                <Icon 
                  name="font" 
                  size={20}
                  color={this.props.displayFontSize === MEDIUM_FONT ? "#007AFF" : "black" } 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectorIcon} onPress={this.selectLargeFont}>
                <Icon 
                  name="font" 
                  size={24} 
                  color={this.props.displayFontSize === LARGE_FONT ? "#007AFF" : "black" } 
                />
              </TouchableOpacity>
            </View>
          </View>)
        }
    </View>)
  }
} 



function mapStateToProps(state) {
  const {
    displayFontSize,
    displaySizeToolbarIsShowing,
  } = state.textSizeControlsReducer;
  
  return {
    displayFontSize,
    displaySizeToolbarIsShowing
  };
}

const mapDispatchToProps = {
  setDisplayFontSize,
  setFontSizeToolBarState
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSizeControls);