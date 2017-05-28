import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import Strings from "../constants/Strings";

import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const styles = StyleSheet.create({
  bottomButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 25,
    margin: 3,
    borderColor: "white",
  },
  text: {
    color: "white"
  },
  bottomButtonsTop: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default class BottomButtonsLocation extends Component {
  render() {
    return (
      <View style={styles.bottomButtons}>
        <View style={styles.bottomButtonsTop} >
          <TouchableHighlight style={styles.button} >
            <Text style={styles.text} >{Strings.DINING}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} >
            <Text style={styles.text} >{Strings.HOTELS}</Text>
          </TouchableHighlight>
        </View>
          <TouchableHighlight style={styles.button} >
          <Text style={styles.text} >{Strings.TRANSPORTATION}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}
