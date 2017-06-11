import MapView from "react-native-maps";
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  FILTER_LOCATIONS,
  CACHE_LOCATIONS,
  GET_CACHED_LOCATIONS,
  SET_MAP_LOCATION,
  SET_USERS_LOCATION,
  SET_PAGE,
  SELECT_WINERY_ON_MAP,
  DONE_RECEIVING_LOCATIONS,
  ERROR_LOADING_LOCATIONS } from "../constants";

import { boundsContains, getBounds } from "../../utils";

const NAPA_COORDS = {  // napa default
  latitude: 38.299061,
  longitude: -122.285738,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
};

const defaultData = {
  isRequesting: false,
  locations: [],
  locationsRaw: [],
  page: 1,
  currPageLen: null,
  selectedWinery: null,
  usersLocation: NAPA_COORDS,
  region: NAPA_COORDS
};

export default function mapReducer(state = defaultData, action) {
  switch (action.type) {
  case REQUEST_LOCATIONS:
    return {
      ...state,
      isRequesting: true
    };
  case SELECT_WINERY_ON_MAP:
    return {
      ...state,
      selectedWinery: action.selectedWinery
    };
  case RECEIVE_LOCATIONS:
    const locations = action.locations;
    return {
      ...state,
      locationsRaw: state.locationsRaw.concat(action.locations),
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
  case SET_USERS_LOCATION:
    console.log("does this already have long and lat delta? ", action.usersLocation)
    return {
      ...state,
      usersLocation: {
        ...action.usersLocation, 
        latitudeDelta:0.1,
        longitudeDelta:0.1
      }
    };
  case SET_MAP_LOCATION:
    const { latitude, longitude } = action;
    let { latitudeDelta, longitudeDelta } = action;
    latitudeDelta = latitudeDelta || state.latitudeDelta;
    longitudeDelta = longitudeDelta || state.longitudeDelta;
    return {
      ...state,
      region: {
        latitudeDelta,
        longitudeDelta,
        longitude,
        latitude
      }
    };
  case FILTER_LOCATIONS:
    if (state.region) {
      const bounds = getBounds(state.region);
      return {
        ...state,
        locations: state.locationsRaw.filter((location) => {
          const { selectedWinery } = state;
          location.isSelected = selectedWinery && selectedWinery.title === location.title;
          return boundsContains(bounds, location.latlng);
        })
      };
    }
  default:
    return state;
  }
}
