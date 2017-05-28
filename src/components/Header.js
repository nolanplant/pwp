import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

let { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    width,
    height: 60,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    opacity: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
    flex: 1
  },
  homeButton: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginLeft: 15,
    marginTop: 20
  },
  mainIcon: {
    height: 40,
    width: 40
  },
  menuButton: {
    marginTop: 15,
    paddingTop: 15,
    height: 45,
    width: 45
  }
});

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.homeButton}
          onPress={this.props.onHomeClick}
        >
        <Image style={styles.mainIcon} source={require("../../images/main-logo.png")} />
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={this.props.onMenuClick}
        >
          <Icon name="bars" size={24} />
        </TouchableOpacity>
      </View>
    );
  }
}
