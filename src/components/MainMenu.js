import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";
import { logoutUser } from "../actions/loginActions";
import { goToLoginPage } from "../actions/homeActions";
import Avatar from "./Avatar";
import { menuItems } from "../../constants";
import MenuItem from "./MenuItem";

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgb(53, 53, 54)", // "rgba(0,0,0,0.79)",//"#303030",
    flex: 1
    // color: '#969696'
  },
  avatarContain: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center"
  },
  menuHeader: {
    height: 70,
    backgroundColor: "#1c1c1c",
  },
  loginContain: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  welcome: {
    color: "#b5870f",
    textAlign: "center",
    marginTop: 10
  },
  loginWrap: {
    backgroundColor: "#b5870f",
    // paddingTop:5,
    // paddingBottom:5,
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  loginWrapLoggediN: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent"
  },
  loginText: {
    color: "white"
  },
  loginTextLoggedIn: {
    color: "#676768"
  },
  loginButtonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
  }
  loginHandler() {
    const { isLoggedIn, logoutUser, goToLoginPage } = this.props;
    if (isLoggedIn) {
      logoutUser();
    } else {
      goToLoginPage();
    }
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.avatarContain}>
          <Avatar size={70} avatarSrc={this.props.avatarSrc} />
          { this.props.displayName && <Text style={styles.welcome}>{Strings.GET_USER_WELCOME_MESSAGE(this.props.displayName)}</Text> }
        </View>
        {
          menuItems && menuItems.map((props, index) => {
            return (<MenuItem {...props} navigation={this.props.navigation} key={index} />);
          })
        }
        <View style={styles.loginContain} >
          <TouchableHighlight
            style={this.props.isLoggedIn ? styles.loginWrapLoggediN : styles.loginWrap}
            onPress={this.loginHandler}
          >
            <View style={styles.loginButtonView}>
              <Text style={this.props.isLoggedIn ? styles.loginTextLoggedIn : styles.loginText}>
              {
                this.props.isLoggedIn ? Strings.LOGOUT : Strings.LOGIN
              }
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    isLoggedIn,
    displayName
  } = state.loginReducer;
  const {
   avatarSrc
  } = state.profileReducer;

  return {
    isLoggedIn,
    avatarSrc,
    displayName
  };
}

const mapDispatchToProps = {
  logoutUser,
  goToLoginPage
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
