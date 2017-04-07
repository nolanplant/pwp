import React, { Component } from "react";
import AppTabs from "./AppTabs";
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

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
          state: this.props.navState,
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  const { navReducer: navState } = state;
  return {
    navState
  };
}

export default connect(mapStateToProps)(AppTabContainer);
