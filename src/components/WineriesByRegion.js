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

const translateData = (data) => {
  const cleanData = data.map((item) => {
    item.title = item.title ? item.title.rendered : (item.slug || Strings.WINERY);
    const reg = /data-medium-file=\"(.*?)\"/g;
    const srcRaw = reg.exec(item.content.rendered);
    let src;
    // todo: clean this up
    if (srcRaw && srcRaw.length === 2) {
      src = srcRaw[1];
    } else {
      const reg2 = /\ssrc=\"(.*?)\"/g;
      const srcRaw2 = reg2.exec(item.content.rendered);
      src = srcRaw2 && srcRaw2.length === 2 ? srcRaw2[1] : "";
    }
    item.thumb = src;
    // this is gross clean this up (possible use html parsing library or cleanerer regex)
    let cleaned = item.maplist_description.replace(/<\/ul>/g, "");
    cleaned = cleaned.replace(/<ul>/g, "");
    cleaned = cleaned.replace(/<li>/g, "");
    cleaned = cleaned.replace(/<\/li>/g, "");
    cleaned = cleaned.replace(/<i>/g, "");
    cleaned = cleaned.replace(/<\/i>/g, "");
    cleaned = cleaned.replace(/<b>/g, "");
    cleaned = cleaned.replace(/<\/b>/g, "");
    cleaned = cleaned.replace(/<br\/>/g, "");
    cleaned = cleaned.replace(/<br\s\/>/g, "");
    item.description = cleaned.trim();
    item.address = item.maplist_address;
    // debugger
    return item;
  });
  return cleanData;
};


export default class WineriesByRegion extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.fetchNext = this.fetchNext.bind(this);
    this.state = {
      currentPage: 0,
      pageLen: null,
      maxPages: null,
      dataSource: [],
      fetching: false
    };
  }
  componentDidMount() {
    // todo: add paging
    this.fetchNext();
  }
  goBack() {
    this.props.parentNav.pop();
  }
  fetchNext() {
    const { currentPage, maxPages } = this.state;
    if (!maxPages || currentPage < maxPages) {
      const path = getSubRoute("maplists", {
        map_location_categories: this.props.id,
        page: currentPage + 1
      });
      // todo: add proper error handling
      fetch(path, {
        method: "GET"
      }).then((data) => data.json())
      .then((data) => {
        const cleaned = translateData(data);
        if (currentPage === 0) {
          this.setState({ pageLen: cleaned.length });
        }
        // set max page when we get a shorter response
        // keep track of this bc we dont know maxPages from Server yet
        if (cleaned.length < this.state.pageLen) {
          this.setState({ maxPages: currentPage });
        }

        this.setState({
          dataSource: this.state.dataSource.concat(cleaned),
          currentPage: currentPage + 1 // need to add max page check here
        });
      });
    }
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={styles.base}>
        <View style={styles.header}>
            <TouchableHighlight onPress={this.goBack}>
              <View>
                <SvgUri width="15" height="15" style={styles.back} source={require("../../images/left-arrow.svg")} />
              </View>
            </TouchableHighlight>
            <Text style={styles.titleText}>{this.props.route.title}</Text>
        </View>
        <View style={styles.topButtons}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}>
            <TouchableHighlight style={styles.topButton}>
              <Text style={{ color: "white", textAlign: "center" }}>{Strings.ALL}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.topButton}>
              <Text style={{ color: "white", textAlign: "center" }}>{Strings.FAVORITES}</Text>
            </TouchableHighlight>
          </View>
        </View>
        <Text style={{ textAlign: "center" }}>{Strings.SWIPE_LEFT_TO_FAVORITE}</Text>
        <SwipeListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.state.dataSource)}
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
          renderHiddenRow={data => (
            <View style={styles.rowBack}>
              <View style={styles.rowBackFavItem}>
                <Text style={styles.favorite}>{Strings.FAVORITE}</Text>
              </View>
            </View>
          )}
          rightOpenValue={-75}
          enableEmptySections
          onEndReached={this.fetchNext}
        />
      </View>
    );
  }
}
