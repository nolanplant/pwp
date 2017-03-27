import React, { Component } from 'react';
import { HOME, LOCATION_DETAIL } from '../constants';
import AppHome from './AppHome';
import LocationScreen from './LocationScreen';
// import WineMapView from './WineMapView';
import {
  Navigator
} from 'react-native';

export default class PriorityWinePass extends Component {
  constructor(props){
    super(props);
    this.renderFullScene = this.renderFullScene.bind(this);
    this.state = {
      token: null
    }
  }
  renderFullScene(route, navigator){
    const { name, id } = route;
    switch (name) {
      case HOME:
        return (
          <AppHome 
            parentNav={navigator}
            token={this.props.token}  
            route={route} />);
      case LOCATION_DETAIL:
        return (
          <LocationScreen 
            parentNav={navigator} 
            id={id}
            token={this.props.token} 
            route={route} />);  
      default:
        return (<AppHome parentNav={navigator} />); 
    }    
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: HOME }}
        renderScene={ this.renderFullScene }
      />
    );
  }
}