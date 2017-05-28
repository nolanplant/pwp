import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
  },
  mainIcon: {
    height: 40,
    width: 150,
    marginLeft: 15,
    resizeMode: "contain",
  },
  menu: {
    marginRight: 25
  }
});

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Image style={styles.mainIcon} source={require("../images/pwp.png")} />
        <TouchableHighlight
          style={styles.menuItem}
          onPress={this.props.onMenuClick}
        >
          <View style={styles.menuItemView}>
            <SvgUri width="20" height="20" style={styles.menu} source={require("../images/menu-button.svg")} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
