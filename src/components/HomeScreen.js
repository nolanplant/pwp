import React, {Component} from 'react';
import AppTabContainer from '../containers/AppTabContainer';
import Drawer from 'react-native-drawer';
import MainMenu from './MainMenu';
import { connect } from 'react-redux';
import { closeDrawer, openDrawer } from '../actions/homeActions';
import Header from './Header';
import { NavigationActions } from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
       <Drawer
        type="overlay"
        tapToClose={true}
        open={this.props.isDrawerOpen}
        tweenDuration={150}
        content={<MainMenu navigation={this.props.navigation} />}
        captureGestures={true}
        side={'right'}
        acceptPan={true}
        negotiatePan={true}
        useInteractionManager={true}
        openDrawerOffset={(viewport) => {
          return 100
        }}
        onClose={this.props.closeDrawer}
      >
        <Header onHomeClick={this.props.goToHome} onMenuClick={this.props.openDrawer}/>
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

const mapDispatchToProps = (dispatch) => ({
  openDrawer(){ 
    dispatch(openDrawer()); 
  },
  closeDrawer(){ 
    dispatch(closeDrawer()); 
  },
  goToHome(){
    dispatch(NavigationActions.navigate({
      routeName: 'Home'
    }));
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

