import React, { Component } from 'react';
import AppTabs from './AppTabs';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

class AppTabContainer extends Component {
  render() {
    return (
      <AppTabs 
        screenProps={{
          stackNav: this.props.stackNav
        }}
        navigation={
        addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} 
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppTabContainer);
