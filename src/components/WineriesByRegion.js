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
const imageSize = 88
const styles = StyleSheet.create({
   base: {
    flex: 1,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    height: 115,
    paddingLeft: 12,
    paddingRight:12
  },
   list: {
    flex: 1
  },
  wineryThumb: { width: imageSize, height: imageSize, borderRadius: imageSize/2, backgroundColor:"#acabab" },
  textRow: { flex: 1, flexDirection: "column", marginLeft:10 },
  title: { fontWeight: "bold", color: "#b88d2c", fontSize:18 },
  address:{ color: "#acabab" },
  description: { color: "#acabab" },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  }
});

class WineryListItem extends Component {
  constructor(props){
    super(props)
    this.onSelectWinery = this.onSelectWinery.bind(this);
  }
  onSelectWinery(){
    const {onSelectWinery, data} = this.props;
    onSelectWinery(data);

  }
  render(){
    const { data } = this.props;
    return (
      <TouchableHighlight style={styles.base} onPress={this.onSelectWinery}> 
        <View style={styles.row} >  
          <Image source={{ uri: data.thumb }} style={styles.wineryThumb} />
          <View style={styles.textRow}>
            <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
            <Text style={styles.description} numberOfLines={1} >{data.description}</Text>
            <Text style={styles.address} numberOfLines={1} >{data.address}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


export default class WineriesByRegion extends Component {
  constructor(props){
    super(props)
    this.renderFooter = this.renderFooter.bind(this);
    this.openWinery = this.openWinery.bind(this);
  }
  renderFooter(){
     return (this.props.isFetching && <ActivityIndicator
          animating={true}
          style={[styles.centering, { height: 80 }]}
          size="large"
        />) 
  }
  openWinery(details){
    const { title, id } = details;
    const { navigation, fetchMoreWineryDetails } = this.props;
    navigation.navigate("WineryDetail", { title, details });
    if(!this.props.currentWinery || this.props.currentWinery.id !== id){
      fetchMoreWineryDetails(id)
    }
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={styles.base}>
        <ListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.props.wineries)}
          renderRow={data => (
            <WineryListItem onSelectWinery={this.openWinery} data={data} />  
          )}
          renderFooter={this.renderFooter}
          onEndReached={this.props.fetchWineries}
        />
      </View>
    );
  }
}
