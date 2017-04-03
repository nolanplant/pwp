import React, {Component} from 'react';
import AppTabs from '../containers/AppTabs';
import Drawer from 'react-native-drawer';
import MainMenu from './MainMenu';
import MenuIcon from './MenuIcon';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header:({ state, setParams }) => ({
      right: (<MenuIcon onMenuClick={ ()=>{alert('open drawer')} } />)
    })
  }
  constructor(props){
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      isDrawerOpen: false
    }
  }
  toggleDrawer(){
    alert('derp')
    this._drawer.open();
  }  
  render() {
    return (
       <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 15}}}
        open={this.state.isDrawerOpen}
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
        <AppTabs />
      </Drawer>
    );
  }
}