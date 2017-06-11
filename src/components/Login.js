import React, { Component } from "react";
import Strings from "../../constants/Strings";
import { BASE_ROUTE } from "../../constants";
import { getAuthRoute, getSubRoute, getWooRoute } from "../../utils";
import Spinner from "react-native-loading-spinner-overlay";
import { LOST_PASSWORD_ROUTE } from '../../constants';

import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  Linking,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  topMargin:{
    marginTop:20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginText: {
    textAlign: "center"
  },
  loginButton: {
    backgroundColor: "orange",
    height: 30,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
  },
  forgotPassword: {
    color: 'white'
  },
  inputBg: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    marginBottom: 10,
  },
  input: {
    padding: 5,
    width: 200,
    height: 40,
    color: "white"
    // backgroundColor: 'red'
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  spinner: { height: 80 }
});

const getStyles = (invalidLogin) => ({
  color: "rgba(255,0,0,0.75)",
  backgroundColor: "transparent",
  marginBottom: 20,
  opacity: invalidLogin ? 1 : 0
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.sendLogin = this.sendLogin.bind(this);
    this.state = {
      username: null,
      password: null
    };
  }
  sendLogin() {
    const { username, password } = this.state;
    if (username && password) {
      const { isLoggingIn, loginUser } = this.props;
      !isLoggingIn && loginUser({ username, password });
    }
  }
  handlePasswordReset(){
    Linking.openURL(LOST_PASSWORD_ROUTE);
  }
  render() {
    return (
      <View style={styles.base}>
        <View style={styles.background} >
          <Image source={require("../../images/background-image.png")} style={styles.backgroundImage} />
        </View>
        <View>
          <View style={styles.inputBg}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.input}
              placeholder={Strings.USERNAME}
              onChangeText={(username) => this.setState({ username })}
              editable
              maxLength={200}
              autoCapitalize={'none'}
              placeholderTextColor={'rgba(250,250,250,0.5)'}
            />
          </View>
          <View style={styles.inputBg}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder={Strings.PASSWORD}
            onChangeText={(password) => this.setState({ password })}
            editable
            maxLength={200}
            secureTextEntry
            autoCapitalize={'none'}
            placeholderTextColor={'rgba(250,250,250,0.5)'}
          />
          </View>
        </View>
         <Text style={getStyles(this.props.invalidLogin)} >
          {
            Strings.INVALID_LOGIN
          }
        </Text>
        <TouchableHighlight style={styles.loginButton} onPress={this.sendLogin}>
          <Text style={styles.loginText}>{ Strings.LOGIN }</Text>
        </TouchableHighlight>
         <TouchableHighlight style={styles.topMargin} onPress={this.handlePasswordReset}>
            <Text style={styles.forgotPassword}>{Strings.FORGOT_PASSWORD}</Text>
         </TouchableHighlight>
         <ActivityIndicator
          animating={this.props.isLoggingIn}
          style={[styles.centering, styles.spinner]}
          size="large"
          />
      </View>
    );
  }
}
