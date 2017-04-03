import React, { Component } from 'react';
import Strings from '../../constants/Strings';
import {BASE_ROUTE} from '../../constants';
import {getAuthRoute, getSubRoute, getWooRoute } from '../../utils';
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
  },
  icon: {
    width: 26,
    height: 26,
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    tabBar: {
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      icon: ({ focused }) => {
        return (
          <Image 
            style={styles.icon}
            source={focused ? require('../../images/user_highlighted.png') : require('../../images/user.png')}
          />);
      },  
     
    }
  }
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

      const token = response.token;
      const sepPath = getWooRoute('orders')//getSubRoute('maplists', {posts_per_page:99})
      console.log(sepPath)
      fetch( sepPath, {
        method:'GET', 
       'headers': {
          'Authorization':`Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then( ( response ) => { debugger})

      const anotherPath = getSubRoute('maplists', {per_page:75})
      fetch( anotherPath, {
        method:'GET', 
       'headers': {
          'Authorization':`Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then( ( response ) => { debugger})

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