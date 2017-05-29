import React, { Component } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import Login from "../components/Login";
// import Profile from "../components/Profile";
import Avatar from "../components/Avatar";
import { getUserProfile, getOrderByNumber } from "../actions/profileActions";
import Strings from "../../constants/Strings";
import Orders from "../components/Orders";

const styles = StyleSheet.create({
  profileBase: { flex: 1, padding: 20 },
  header: {
    marginTop: 60,
    marginBottom: 20,
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  subHeader: {
    color: "#bebebe",
    fontSize: 12,
    marginTop: 2
  },
  rowItem: {
    flex: 1
  },
  rowItemText: {
    color: "grey",
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold"
  },
  spinner: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  orderArea: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  }
});

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    return (
      <ScrollView >
        <View style={styles.profileBase}>
          <View style={styles.header}>
            <Avatar size={70} avatarSrc={this.props.avatarSrc} />
            <Text style={styles.heading} >{Strings.MY_ACCOUNT}</Text>
          </View>
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
          <View style={styles.orderArea}>
            <Text style={styles.heading} >{Strings.ORDERS}</Text>
          </View>
             { this.props.orders.length ? <Orders orders={this.props.orders} handleClick={this.props.getOrderByNumber} /> : <ActivityIndicator
              animating
              style={styles.spinner}
              size="large"
            />
              }
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
