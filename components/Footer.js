import React, { Component } from "react";
import { MAP, USER, LOCATIONS } from "../constants";
import SvgUri from "react-native-svg-uri";
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
  },
  bottomButton: {
    width: 50
  }
});

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.map = this.map.bind(this);
    this.user = this.user.bind(this);
    this.locations = this.locations.bind(this);
  }
  locations() {
    this.props.onClickButton({ name: LOCATIONS });
  }
  map() {
    this.props.onClickButton({ name: MAP });
  }
  user() {
    this.props.onClickButton({ name: USER });
  }
  render() {
    return (
      <View style={styles.footer}>
        <TouchableHighlight style={styles.bottomButton} onPress={this.locations}>
          <View>
          <SvgUri width="15" height="15" style={styles.footer} source={require("../images/home.svg")} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.bottomButton} onPress={this.map}>
          <View>
          <SvgUri width="15" height="15" style={styles.footer} source={require("../images/location.svg")} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.bottomButton} onPress={this.user}>
          <View>
          <SvgUri width="15" height="15" style={styles.footer} source={require("../images/user.svg")} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
