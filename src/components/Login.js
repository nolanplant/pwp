import React, { Component } from 'react';
import Strings from '../../constants/Strings';
import {BASE_ROUTE} from '../../constants';
import {getAuthRoute, getSubRoute, getWooRoute } from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';


import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    'backgroundColor':'#ffffff'
  },
  loginText:{
    textAlign: 'center'
  },
  loginButton:{
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    width:200,
    marginBottom:10,
    height:40,
    borderColor: '#DDD',
    'borderWidth': 1
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});

export default class Login extends Component {
  constructor(props){
    super(props);
    this.sendLogin = this.sendLogin.bind(this);
    this.state = {
      username: null,
      password: null
    }
  }
  sendLogin(){
    const { username, password } = this.state;
    if(username && password){
      const { isLoggingIn, loginUser } = this.props;
      !isLoggingIn && loginUser({username, password});
    }
  }
  render() {
    return (
      <View style={styles.base}>
        <ActivityIndicator
          animating={this.props.isLoggingIn}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder={Strings.USERNAME}
            onChangeText={(username) => this.setState({username})}
            editable={true}
            maxLength={200}
            autoCapitalize={'none'}
          />
          <TextInput
            style={styles.input}
            placeholder={Strings.PASSWORD}
            onChangeText={(password) => this.setState({password})}
            editable={true}
            maxLength={200}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <TouchableHighlight style={styles.loginButton} onPress={this.sendLogin}>
          <Text style={styles.loginText}>{ Strings.LOGIN }</Text>
        </TouchableHighlight>
        <Text style={{ color:'red', marginTop:10 }} >
          { 
            this.props.invalidLogin && Strings.INVALID_LOGIN 
          }
        </Text>
      </View>
    );
  }
}