import React, {Component} from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions/loginActions';
import Login from '../components/Login';
import ProfileContainer from './ProfileContainer';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  }
});

class UserPageContainer extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ focused }) => {
        return (
          <Image 
            style={styles.icon}
            source={focused ? require('../../images/user_highlighted.png') : require('../../images/user.png')}
          />);
      },  
     
    }
  }
  render() {
    return (this.props.isLoggedIn ? 
       <ProfileContainer /> : <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    isLoggedIn,
    isLoggingIn,
    invalidLogin
  } = state.loginReducer;
  return {
    isLoggedIn,
    isLoggingIn,
    invalidLogin
  };
}

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer);
