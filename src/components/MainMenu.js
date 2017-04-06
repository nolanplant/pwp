import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import Strings from '../../constants/Strings';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/loginActions';
import { goToLoginPage } from '../actions/homeActions';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#303030',
    flex: 1
    //color: '#969696'
  },
  menuHeader: {
    height: 70,
    backgroundColor: '#1c1c1c',
  },
  menuItemView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center'
  },
  menuText: {
    color: '#969696',
    marginLeft: 8
  },
  loginContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginWrap: {
    backgroundColor: '#b5870f',
    // paddingTop:5,
    // paddingBottom:5,
    flex:1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  loginText: {
    color: 'white'
  }
});

class MainMenu extends Component {
  constructor(props){
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
  }
  loginHandler(){
    const { isLoggedIn, logoutUser, goToLoginPage } = this.props;
    if(isLoggedIn){
      logoutUser();
    } else {
      goToLoginPage();
    }
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.menuHeader} />
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/home.svg')} />
            <Text style={styles.menuText}>{Strings.HOW_IT_WORKS}</Text>
          </View>
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/location.svg')} />
            <Text style={styles.menuText}>{Strings.MY_ACCOUNT}</Text>
          </View>
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/user.svg')} />
            <Text style={styles.menuText}>{Strings.CONCIERGE}</Text>
          </View>
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/user.svg')} />
            <Text style={styles.menuText}>{Strings.BLOG}</Text>
          </View>
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/user.svg')} />
            <Text style={styles.menuText}>{Strings.FAQ}</Text>
          </View>
          <View style={styles.menuItemView}>
            <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/user.svg')} />
            <Text style={styles.menuText}>{Strings.BUY_RENEW}</Text>
          </View>
        <View style={styles.loginContain} >
          <TouchableHighlight style={styles.loginWrap} onPress={this.loginHandler}>
            <View style={styles.menuItemView}>
              <SvgUri width="15" height="15" style={styles.footer} source={require('../../images/user.svg')} />
              <Text style={styles.loginText}>
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
    isLoggedIn
  } = state.loginReducer;
  return {
    isLoggedIn
  };
}

const mapDispatchToProps = {
  logoutUser,
  goToLoginPage
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
