import React, { Component } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, Linking, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import Login from "../components/Login";
// import Profile from "../components/Profile";
import Avatar from "../components/Avatar";
import { getUserProfile, getOrderByNumber } from "../actions/profileActions";
import Strings from "../../constants/Strings";
import Orders from "../components/Orders";
import { EDIT_ACCOUNT_ROUTE } from '../../constants';

const styles = StyleSheet.create({
  profileBase: { 
    flex: 1, 
    padding: 20,
    backgroundColor: "#eeeeee",
    alignItems: "center"
  },
  header: {
    marginTop: 60,
    marginBottom: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    flex: 1,
    color: "grey",
    fontSize: 20,
    fontWeight: "bold"
  },
  profDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    color: "#bebebe",
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center'
  },
  rowItem: {
    flex: 1
  },
  rowItemText: {
    color: "grey",
    marginTop: 8,
    marginBottom: 8
  },
  spinner: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  editAccountText:{
    color: '#B98E1D',
    fontSize: 12,
    paddingTop: 20,
    paddingBottom:20
  }
});

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  handleEditAccount(){
    Linking.openURL(EDIT_ACCOUNT_ROUTE);
  }
  render() {
    return (
      <ScrollView >
        <View style={styles.profileBase}>
          <View style={styles.header}>
         <Avatar size={70} avatarSrc={this.props.avatarSrc} /> 
            <Text style={styles.heading} >{Strings.MY_ACCOUNT}</Text>
          </View>
            { this.props.orders.length ? <Orders orders={this.props.orders} handleClick={this.props.getOrderByNumber} /> : <ActivityIndicator
              animating
              style={styles.spinner}
              size="large"
            />
              }
          <View style={styles.profDetails}>
            <View style={styles.rowItem}>
              <Text style={styles.subHeader}>{Strings.FULL_NAME}</Text>
              <Text style={styles.rowItemText}>{this.props.displayName}</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.subHeader}>{Strings.EMAIL}</Text>
              <Text style={styles.rowItemText}>{this.props.email}</Text>
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.subHeader}>{Strings.USERNAME}</Text>
              <Text style={styles.rowItemText}>{this.props.username || "-"}</Text>
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.subHeader}>{Strings.ADDRESS}</Text>
              <Text style={styles.rowItemText}>{this.props.address || "-"}</Text>
            </View>
          </View>
          <TouchableHighlight underlayColor="#eeeeee" onPress={this.handleEditAccount} >
             <Text style={styles.editAccountText}>
                {Strings.EDIT_ACCOUNT_INFO}
             </Text>
          </TouchableHighlight>

        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { displayName, email } = state.loginReducer;

  const {
    avatarSrc,
    username,
    orders,
    address } = state.profileReducer;
  return {
    displayName,
    avatarSrc,
    username,
    address,
    orders,
    email
  };
}

const mapDispatchToProps = {
  getUserProfile,
  getOrderByNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
