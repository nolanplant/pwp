import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import Login from "../components/Login";
// import Profile from "../components/Profile";
import Avatar from "../components/Avatar";
import {getUserProfile} from '../actions/profileActions';

const styles = StyleSheet.create({
  profileBase: { flex: 1, justifyContent: "center", alignItems: "center" },
  // image: {
  //   height:100,
  //   width:100,
  //   borderRadius:50
  // }
});

class ProfileContainer extends Component {
  componentDidMount(){
    this.props.getUserProfile();
  }
  render() {
    return (
      <View style={styles.profileBase}>
        <Avatar size={70} avatarSrc={this.props.avatarSrc} />
        <Text>Hello {this.props.displayName}!</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { displayName } = state.loginReducer;
  const { avatarSrc } = state.profileReducer;
  return {
    displayName: displayName || null,
    avatarSrc: avatarSrc || null
  };
}

const mapDispatchToProps = {
  getUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
