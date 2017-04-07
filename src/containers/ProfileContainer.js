import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getUsersLocation } from "../actions/mapActions";
import Login from "../components/Login";
import Profile from "../components/Profile";

const styles = StyleSheet.create({

});

class ProfileContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LOGGED IN!</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(ProfileContainer);
