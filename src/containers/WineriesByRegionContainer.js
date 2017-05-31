import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails, fetchMoreWineryDetails} from '../actions/wineriesActions';

const styles = StyleSheet.create({
  backArrow: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  }
});

class WineriesByRegionContainer extends Component {
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
