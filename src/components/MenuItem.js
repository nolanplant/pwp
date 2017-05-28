import React, { Component } from "react";
import Strings from "../../constants/Strings";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  StyleSheet,
  Image,
  View,
  Text,
  Linking,
  TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  menuItemView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#969696",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    paddingBottom: 1,
    paddingTop: 1,
    marginLeft: 20,
    marginRight: 20
  },
  menuText: {
    color: "#969696",
    fontWeight: "bold"
  },
  icon: {
    color: "#676768",
  }
});

export default class MainItem extends Component {
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
  }
  action() {
    const { link, screen, navigation } = this.props;
    if (link) {
      Linking.openURL(link);
    }
    if (screen) {
      navigation.navigate("MenuItemStaticPage", { screen });
    }
  }
  render() {
    return (
      <View style={styles.base}>
        <TouchableHighlight style={styles.base} onPress={this.action}>
          <View style={styles.menuItemView} >
            <Text style={styles.menuText}>{this.props.title}</Text>
            <Icon name={this.props.icon} size={25} color="#676768" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
