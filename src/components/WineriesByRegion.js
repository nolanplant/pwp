import React, { Component } from "react";
import Strings from "../../constants/Strings";
import SvgUri from "react-native-svg-uri";
import { BASE_ROUTE, FIXTURES } from "../../constants";
import { getSubRoute } from "../../utils";
import {
  AppRegistry,
  ActivityIndicator,
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
  },
  rowFront: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    height: 120,
  },
   list: {
    flex: 1
  },
  wineryThumb: { width: 90, height: 90, margin: 10, borderRadius:40, backgroundColor:"#acabab" },
  textRow: { flex: 1, flexDirection: "column" },
  title: { fontWeight: "bold", color: "#b88d2c", fontSize:20 },
  address:{ color: "#acabab" },
  description: { color: "#acabab" },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  }
});

export default class WineriesByRegion extends Component {
  constructor(props){
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
  }
  renderFooter(){
     return (this.props.isFetching && <ActivityIndicator
          animating={true}
          style={[styles.centering, { height: 80 }]}
          size="large"
        />) 
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={styles.base}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.props.wineries)}
          renderRow={data => (
              <View style={styles.rowFront}>
                <Image source={{ uri: data.thumb }} style={styles.wineryThumb} />
                <View style={styles.textRow}>
                  <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                  <Text style={styles.description} numberOfLines={1} >{data.description}</Text>
                  <Text style={styles.address} numberOfLines={1} >{data.address}</Text>
                </View>
              </View>
          )}
          renderFooter={this.renderFooter}
          onEndReached={this.props.fetchWineries}
        />
       
      </View>
    );
  }
}
