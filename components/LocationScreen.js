import React, { Component } from 'react';
import Strings from '../constants/Strings';
import SvgUri from 'react-native-svg-uri';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
  base:{
    flex:1,
    backgroundColor: '#ffffff'
  },
  back: {
    marginLeft:20
  },
  header: {
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#1c1c1c'
  },
  favorite:{
    color:'white',
    textAlign:'center',
    marginLeft:125
  },
  rowBackFavItem:{
    width:200,
    height:100,
    flexDirection:'column',
    backgroundColor: '#387ef5',
    justifyContent:'center',
    alignItems: 'center'
  },
  titleText:{
    color: '#ffffff',
    marginLeft:10
  },
  list:{
    flex: 1
  },
  mainIcon: {
   height:40,
   width:150,
   marginLeft:15,
   resizeMode: 'contain',
  },
  menu: {
   marginRight: 25
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 100,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  topButtons: {
    height:40,
    padding:0
  },
  topButton: {
    flex:1,
    backgroundColor: '#444',
    justifyContent: 'center'
  }
});

const translateData = (data) => {
  const cleanData = data.map((item)=>{
    item.title = item.rendered ? item.rendered.title : Strings.WINERY;
    item.thumb = 'https://i0.wp.com/www.prioritywinepass.com/wp-content/uploads/2017/03/durantandbooth-tastingsalonempty.jpg?resize=150%2C150&ssl=1'
    item.description = item.maplist_description 
    item.addess = item.maplist_address
    return item;
  })
  return cleanData;
}

export default class LocationScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage:0,
      maxPages: 1,
      dataSource: []
    }
  }

  componentDidMount(){
    fetch(`https://prioritywinepass.com/wp-json/wp/v2/maplists?map_location_categories=${this.props.route.id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data)=>{
      this.setState({ dataSource: this.state.dataSource.concat(translateData(data)) })
    });
  }
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.base}>
        <View style={styles.header}>
          <SvgUri width="15" height="15" style={styles.back} source={require('../images/home.svg')}  />
          <Text style={styles.titleText}>{this.props.route.title}</Text>
        </View>
        <View style={styles.topButtons}>
          <View style={{flex:1, flexDirection:'row', alignItems: 'stretch'}}>
            <TouchableHighlight style={styles.topButton}>
              <Text style={{color: 'white', textAlign: 'center'}}>{Strings.ALL}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.topButton}>
              <Text style={{color:'white', textAlign: 'center'}}>{Strings.FAVORITES}</Text>
            </TouchableHighlight>
          </View>
        </View>
        <Text style={{textAlign: 'center'}}>{Strings.SWIPE_LEFT_TO_FAVORITE}</Text>
        <SwipeListView
          style={styles.list}
          dataSource={ds.cloneWithRows(this.state.dataSource)}
          renderRow={ data => (
              <View style={styles.rowFront}>
                <Image source={data.source} height="50" width="50" />
                <Text>{data.title}</Text>
                <Text>{data.description}</Text>
                <Text>{data.addess}</Text>
              </View>
          )}
          renderHiddenRow={ data => (
            <View style={styles.rowBack}>
              <View style={styles.rowBackFavItem}>
                <Text style={styles.favorite}>{Strings.FAVORITE}</Text>
              </View>
            </View>
          )}
          rightOpenValue={-75}
          onEndReached={() => alert('yay')}
        />
      </View>
    );
  }
}