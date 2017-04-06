import React, {Component} from 'react';
import AppTabContainer from '../containers/AppTabContainer';
import Drawer from 'react-native-drawer';
import MainMenu from './MainMenu';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/homeActions';
import Header from './Header';
import { NavigationActions } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }
  constructor(props){
    super(props);
    this.goToHome = this.goToHome.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  goToHome(){
   this.props.dispatch(NavigationActions.navigate({
    routeName: 'Home'
   }))
  }
  toggleDrawer(){
    this.props.dispatch(toggleDrawer())
  }
  render() {
    return (
       <Drawer
        tapToClose={true}
        open={this.props.isDrawerOpen}
        tweenDuration={150}
        content={<MainMenu/>}
        captureGestures={true}
        side={'right'}
        acceptPan={true}
        negotiatePan={true}
        useInteractionManager={true}
        openDrawerOffset={(viewport) => {
          return 100
        }}
        onCloseStart={this.props.toggleDrawer}
      >
        <Header onHomeClick={this.goToHome} onMenuClick={this.toggleDrawer}/>
        <AppTabContainer stackNav={this.props.navigation} />
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
    
    const {
      isDrawerOpen
    } = state.homeReducer;
    return {
        isDrawerOpen
    };
}

const mapDispatchToProps = (dispatch)=> {
  return {
  toggleDrawer,
  dispatch
  }
}


export default connect(mapStateToProps)(HomeScreen);

