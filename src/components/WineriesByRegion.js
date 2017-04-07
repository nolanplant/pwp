import React, { Component } from "react";
import Strings from "../../constants/Strings";
import SvgUri from "react-native-svg-uri";
import { BASE_ROUTE, FIXTURES } from "../../constants";
import { getSubRoute } from "../../utils";
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  back: {
    marginLeft: 20
  },
  header: {
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1c1c1c"
  },
  favorite: {
    color: "white",
    textAlign: "center",
    marginLeft: 125
  },
  rowBackFavItem: {
    width: 200,
    height: 100,
    flexDirection: "column",
    backgroundColor: "#387ef5",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "#ffffff",
    marginLeft: 10
  },
  list: {
    flex: 1
  },
  mainIcon: {
    height: 40,
    width: 150,
    marginLeft: 15,
    resizeMode: "contain",
  },
  menu: {
    marginRight: 25
  },
  rowFront: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  topButtons: {
    height: 40,
    padding: 0
  },
  topButton: {
    flex: 1,
    backgroundColor: "#444",
    justifyContent: "center"
  }
});

export default class WineriesByRegion extends Component {
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={styles.base}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.props.wineries)}
          renderRow={data => (
              <View style={styles.rowFront}>
                <Image source={{ uri: data.thumb }} style={{ width: 50, height: 50, margin: 10 }} />
                <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", color: "#666" }} numberOfLines={1}>{data.title}</Text>
                <Text style={{ color: "#666" }} numberOfLines={1} >{data.description}</Text>
                <Text style={{ color: "#bababa" }} numberOfLines={1} >{data.address}</Text>
                </View>
              </View>
          )}
          onEndReached={this.props.fetchWineries}
        />
      </View>
    );
  }
}
