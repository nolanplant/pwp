import { 
  GET, 
  REQUEST_LOCATIONS, 
  RECEIVE_LOCATIONS, 
  ERROR_LOADING_LOCATIONS, 
  SET_PAGE, 
  DONE_RECEIVING_LOCATIONS, 
  SET_USER_LOCATION } from '../constants';
import { getSubRoute } from '../../utils';

function requestLocations() {
  return {
    type: REQUEST_LOCATIONS
  };
}

function receiveLocations(locations) {  
  return {
    type: RECEIVE_LOCATIONS,
    locations
  };
}

function errorLoadingLocations(){
  return {
    type: ERROR_LOADING_LOCATIONS
  }
}

function setPage(page){
  return {
    type: SET_PAGE,
    page
  }
}

function doneReceivingLocations(){
  return {
    type: DONE_RECEIVING_LOCATIONS
  }
}

//todo:  clean this up
const translateData = (data)=> {
  return data.map((loc, index)=>{
    loc.latlng = {
      latitude: +loc.maplist_latitude,
      longitude: +loc.maplist_longitude
    }
    loc.title = loc.title ? loc.title.rendered : Strings.Winery
    loc.description = loc.maplist_description && loc.maplist_description.trim()
    return loc;
  });
}

function setUserLocation({latitude, longitude}){
   return {
    type: SET_USER_LOCATION,
    latitude,
    longitude
   }
}

export function getUsersLocation(){
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
       
        dispatch(setUserLocation({latitude, longitude}))
      },
      (error) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

export function fetchWineLocations() {
  return (dispatch, getState) => {
    const { mapReducer } = getState();
    const { page, currPageLen } = mapReducer;
    console.log('calling fetch ', {page, currPageLen})
    dispatch(requestLocations())
    // fetch small batch to start (then fetch larger)
    const firstFetch = 15;
    const consecFetch = 75;
    const numberItems = page === 1 ? firstFetch : consecFetch;
    const pageCount = page > 1 ? page - 1 : page;
    const path = getSubRoute('maplists', { page: pageCount, per_page: numberItems})
    console.log(path)
    return fetch(path, {
        method: GET
      })
      .then((response) => response.json())
      //.catch(dispatch(errorLoadingLocations()))
      .then((data)=>{
        // second call will have duplicate data (todo: clean this up)
        if(page === 2){
          data = data.slice(firstFetch);
        } 
        dispatch(receiveLocations(translateData(data)))
        dispatch(setPage(page+1))
        if(page === 2 || data.length >= numberItems){
          dispatch(fetchWineLocations())
        } else {
          dispatch(doneReceivingLocations())
        }

      })
    
  }
}  