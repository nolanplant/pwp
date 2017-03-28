import React, { Component } from 'react';
import Strings from '../constants/Strings';
import {BASE_ROUTE} from '../constants';
import {getAuthRoute, getSubRoute} from '../utils';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight
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
  }
});

export default class Login extends Component {
  constructor(props){
    super(props);
    this.sendLogin = this.sendLogin.bind(this);
    this.state = {
      username: null,
      password: null,
      error: null
    }
  }
  sendLogin(){
    const {username, password} = this.state;
    const path = getAuthRoute();
    fetch(path, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
      body: JSON.stringify({
         password: password,
         username: username,
      })
    }).then((data) => data.json())
    .then( ( response ) => {
      
      fetch( `https://prioritywinepass.com/wc-api/v3/customers/email/${response.user_email}`, {
        method:'GET', 
       'headers': {
          'Authorization':`Bearer ${response.token}`
        }
      })
        .then((data) => data.json())
        .then( ( response ) => { debugger})
      //this.props.setToken(response);
    }).catch(( error ) => {
      debugger
      this.setState({
        error: Strings.INVALID_CREDENTIALS
      })
    });

  }

  render() {
    return (
      <View style={styles.base}>
         <View>
         {
          this.state.error && <Text styles={{flex:1,color:'red'}}>{this.state.error}</Text>
         }
         <TextInput
            style={styles.input}
            placeholder={Strings.USERNAME}
            onChangeText={(username) => this.setState({username})}
            editable = {true}
            maxLength = {200}
          />
          <TextInput
            style={styles.input}
            placeholder={Strings.PASSWORD}
            onChangeText={(password) => this.setState({password})}
            editable={true}
            maxLength={200}
          />
          </View>
          <TouchableHighlight style={styles.loginButton} onPress={this.sendLogin}>
            <Text style={styles.loginText}>{Strings.LOGIN}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}