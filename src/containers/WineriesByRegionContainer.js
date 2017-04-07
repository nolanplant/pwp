import React, {Component} from 'react';
import { connect } from 'react-redux';
import {View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import WineriesByRegionSkeleton from '../components/WineriesByRegionSkeleton';
import WineriesByRegion from '../components/WineriesByRegion';
import {fetchWineries, setWineRegionDetails } from '../actions/wineriesActions';


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
        <TouchableHighlight 
          onPress={ ()=>{ goBack(); } }
          >
          <Image
            source={require('../../images/back-arrow-white.png')}
          />
        </TouchableHighlight>)
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
    currentPage
  } = state.wineriesReducer;
  return {
    wineries,
    isFetching
  };
}

const mapDispatchToProps = {
  fetchWineries,
  setWineRegionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(WineriesByRegionContainer);
