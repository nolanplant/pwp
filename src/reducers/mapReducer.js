import MapView from "react-native-maps";
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  CACHE_LOCATIONS,
  GET_CACHED_LOCATIONS,
  SET_MAP_LOCATION,
  SET_PAGE,
  DONE_RECEIVING_LOCATIONS,
  ERROR_LOADING_LOCATIONS } from "../constants";


const defaultData = {
  isRequesting: false,  
  locations: [],
  page: 1,
  currPageLen: null,
  initialPosition: {  // napa default
    latitude: 38.299061,
    longitude: -122.285738,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8
  }
};

export default function mapReducer(state = defaultData, action) {
  switch (action.type) {
  case REQUEST_LOCATIONS:
    return {
      ...state,
      isRequesting: true
    };
  case RECEIVE_LOCATIONS:
    return {
      ...state,
      locations: state.locations.concat(action.locations),
      currPageLen: action.locations.length
    };  
  case SET_PAGE:
    return {
      ...state,
      page: action.page
    };
  case DONE_RECEIVING_LOCATIONS:
    return {
      ...state,
      isRequesting: false
    };
  case SET_MAP_LOCATION:
    const { initialPosition } = state;
    const { latitude, longitude } = action;
    let { latitudeDelta, longitudeDelta } = action;
    latitudeDelta = latitudeDelta || state.latitudeDelta;
    longitudeDelta = longitudeDelta || state.longitudeDelta;
    return {
      ...state,
      initialPosition: new MapView.AnimatedRegion({
        latitudeDelta,
        longitudeDelta,
        longitude,
        latitude
      })
    };
  default:
    return state;
  }
}
