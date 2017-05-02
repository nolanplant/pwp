import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails, fetchMoreWineryDetails} from '../actions/wineriesActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  backArrow: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  }
});

class WineriesByRegionContainer extends Component {
  static navigationOptions = {
    title: ({state}) => `${state.params.title}`,
    header: ({goBack})=>({ 
      visible: true,
      titleColor: 'rgb(184, 141, 44)',
      titleStyle: {
        color: 'white'
      },
      style: {
        backgroundColor: 'rgb(68, 68, 68)'
      },
      left: (
        <TouchableOpacity 
          onPress={ ()=>{ goBack() } }
          style={styles.backArrow}
          >
          <Icon
            name="chevron-left"
            color="white"
            size={18}
          />
        </TouchableOpacity>)
    })
  };
  componentDidMount(){
    const { params } = this.props.navigation.state
    this.props.setWineRegionDetails(params);
    this.props.fetchWineries();
  }
  render() {
    return (
      this.props.wineries.length ? <WineriesByRegion {...this.props}/> :
      <WineriesByRegionSkeleton />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isFetching,
    wineries,
    currentWinery
  } = state.wineriesReducer;
  return {
    wineries,
    isFetching,
    currentWinery
  };
}

const mapDispatchToProps = {
  fetchWineries,
  setWineRegionDetails,
  fetchMoreWineryDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(WineriesByRegionContainer);
