import { 
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  CACHE_LOCATIONS,
  GET_CACHED_LOCATIONS,
  SET_USER_LOCATION,
  SET_PAGE,
  DONE_RECEIVING_LOCATIONS,
  ERROR_LOADING_LOCATIONS } from '../constants';

const defaultData = {
  isRequesting: false,
  locations: [],
  page:1,
  currPageLen: null,
  initialPosition: {  // napa default
    latitude: 38.299061,
    longitude: -122.285738,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8
  }
}

export function mapReducer(state = defaultData, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isRequesting: true
      });
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        locations: state.locations.concat(action.locations),
        currPageLen: action.locations.length
      });
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      };   
    case DONE_RECEIVING_LOCATIONS:
      return Object.assign({}, state, {
        isRequesting: false
      });
    case SET_USER_LOCATION:
      const { initialPosition } = state;
      const {latitude, longitude} = action;
      return {
        ...state,
        initialPosition: {
          ...initialPosition,
          longitude,
          latitude
        }
      }      
    default:
      return state;
  }
}