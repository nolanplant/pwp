import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainMenu from './MainMenu';
import { LOCATIONS, MAP, USER, LOCATION_DETAIL } from '../constants';
import LocationsView from './LocationsView';
import WineMapView from './WineMapView';
import Login from './Login';

import Drawer from 'react-native-drawer';

import {
  StyleSheet,
  View,
  Navigator
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  body: {
    flex: 7,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  footer:{
    flex:1,
    backgroundColor:'#1c1c1c'
  }
});

export default class AppHome extends Component {
  constructor(props){
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.renderSceneCenter = this.renderSceneCenter.bind(this);
    this.handleBottomNavClick = this.handleBottomNavClick.bind(this);
  }
  renderSceneCenter(route, navigator) {
    const { name } = route; 
    switch (name) {
      case LOCATIONS:
        return (<LocationsView handleBottomNavClick={this.handleBottomNavClick} parentNav={this.props.parentNav} />);
      case MAP:
        return (<WineMapView />);
      case USER:
        return this.props.token ? (<Login />) : (<Login />);
      default:
        return (<LocationsView />);
    }      
  }
  toggleDrawer(){
    this._drawer.open();
  }
  handleBottomNavClick(route){
    this._navigator && this._navigator.push(route)
  }
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 15}}}
        tweenDuration={100}
        content={<MainMenu/>}
        captureGestures={true}
        side={'right'}
        acceptPan={true}
        negotiatePan={true}
        useInteractionManager={true}
        openDrawerOffset={(viewport) => {
          return 100
        }}
      >
      <View style={styles.container}>
        <Header onMenuClick={this.toggleDrawer} />
        <View style={styles.body}>
          <Navigator
            style={{ flex:1 }}
            initialRoute={{ name: LOCATIONS }}
            renderScene={ this.renderSceneCenter }
            ref={(ref)=> this._navigator = ref } 
          />
        </View>
        <Footer style={styles.footer} onClickButton={this.handleBottomNavClick} />
      </View>
    </Drawer>
    );
  }  
}

