import React, {Component} from 'react';
import AppTabs from '../containers/AppTabs';
import Drawer from 'react-native-drawer';
import MainMenu from './MainMenu';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/homeActions';
import Header from './Header';


class HomeScreen extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
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
        <Header onMenuClick={this.props.toggleDrawer}/>
        <AppTabs />
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

const mapDispatchToProps = {
  toggleDrawer
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

