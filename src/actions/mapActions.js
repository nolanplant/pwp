import {
  GET,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  ERROR_LOADING_LOCATIONS,
  SET_PAGE,
  DONE_RECEIVING_LOCATIONS,
  SET_MAP_LOCATION } from "../constants";
import { getSubRoute, translateData } from "../../utils";

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

function errorLoadingLocations() {
  return {
    type: ERROR_LOADING_LOCATIONS
  };
}

function setPage(page) {
  return {
    type: SET_PAGE,
    page
  };
}

function doneReceivingLocations() {
  return {
    type: DONE_RECEIVING_LOCATIONS
  };
}


export function setMapLocation({ latitude, longitude, latitudeDelta, longitudeDelta }) {
  return {
    type: SET_MAP_LOCATION,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
}


export function getUsersLocation() {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setMapLocation({
          latitude,
          longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8
        })
        );
      },
      (error) => {

        // console.error('error', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}

export function fetchWineLocations() {
  return (dispatch, getState) => {
    const { mapReducer } = getState();
    const { page } = mapReducer;
    dispatch(requestLocations());
    // fetch small batch to start (then fetch larger)
    const firstFetch = 15;
    const consecFetch = 95;
    const numberItems = page === 1 ? firstFetch : consecFetch;
    const pageCount = page > 1 ? page - 1 : page;
    const path = getSubRoute("maplists", { page: pageCount, per_page: numberItems });

    return fetch(path, {
      method: GET
    })
      .then((response) => response.json())
      .catch(dispatch(errorLoadingLocations()))
      .then((raw) => {
        // second call will have duplicate data (todo: clean this up)
        const data = { ...raw };
        if (page === 2) {
          data = data.slice(firstFetch);
        }
        dispatch(receiveLocations(translateData(data)));
        dispatch(setPage(page + 1));
        if (page <= 2 || data.length >= numberItems) {
          dispatch(fetchWineLocations());
        } else {
          dispatch(doneReceivingLocations());
        }
      });
  };
}

