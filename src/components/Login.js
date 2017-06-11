import React, { Component } from "react";
import Strings from "../../constants/Strings";
import { BASE_ROUTE } from "../../constants";
import { getAuthRoute, getSubRoute, getWooRoute } from "../../utils";
import Spinner from "react-native-loading-spinner-overlay";
import { LOST_PASSWORD_ROUTE } from '../../constants';
import { ACCOUNT_ROUTE } from '../../constants';

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
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  forgotLink:{
    marginTop:30,
    padding:20  
  },
  registerLink:{
    marginTop:0,
    padding:20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  largeLogo: {
    marginTop: 20,
    marginBottom: 20,
    height:50,
    width:150
  },
  loginBackground: {
    alignItems: "center",
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255, .20)',
    paddingTop: 30,
    minHeight: 380
  },
  loginText: {
    textAlign: "center",
    color: '#ffffff'
  },
  loginButton: {
    backgroundColor: '#B98E1D',
    height: 50,
    width: 250,
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
    marginLeft: 60,
    marginRight:60,
    alignSelf: 'center',
    maxWidth: 250
  },
  input: {
    padding: 5,
    width: 250,
    maxWidth: 250,
    height: 48,
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
  color: "#FE9899",
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
  handleRegisterAccount(){
    Linking.openURL(ACCOUNT_ROUTE);
  }
  render() {
    return (
      <View style={styles.base}>
        <View style={styles.background} >
          <Image source={require("../../images/background-image.png")} style={styles.backgroundImage} />
        </View>
        <View style={styles.loginBackground}>
        <Image style={styles.largeLogo} source={require("../../images/pwp.png")} />
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
           <Text style={getStyles(this.props.invalidLogin)} >
            {
              Strings.INVALID_LOGIN
            }
          </Text>
          <TouchableHighlight underlayColor="#999" style={styles.loginButton} onPress={this.sendLogin}>
            <Text style={styles.loginText}>{ Strings.LOGIN }</Text>
          </TouchableHighlight>
        </View>
         <TouchableHighlight underlayColor="rgba(255,255,255,.1)" style={styles.forgotLink} onPress={this.handlePasswordReset}>
            <Text style={styles.forgotPassword}>{Strings.FORGOT_PASSWORD}</Text>
         </TouchableHighlight>
         <TouchableHighlight underlayColor="rgba(255,255,255,.1)" style={styles.registerLink} onPress={this.handleRegisterAccount}>
            <Text style={styles.forgotPassword}>{Strings.REGISTER_ACCOUNT}</Text>
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
