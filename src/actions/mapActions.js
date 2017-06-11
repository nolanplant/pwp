import {
  GET,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  FILTER_LOCATIONS,
  ERROR_LOADING_LOCATIONS,
  SET_PAGE,
  DONE_RECEIVING_LOCATIONS,
  SET_MAP_LOCATION,
  SET_USERS_LOCATION,
  SELECT_WINERY_ON_MAP } from "../constants";
import { getSubRoute, translateData } from "../../utils";
import getDirections from "react-native-google-maps-directions";

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

export function selectWineryOnMap(selectedWinery) {
  return {
    type: SELECT_WINERY_ON_MAP,
    selectedWinery
  };
}


export function setLocation({ latitude, longitude, latitudeDelta, longitudeDelta }) {
  return {
    type: SET_MAP_LOCATION,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
}

export const setMapLocation = (location) => {
  return (dispatch) => {
    dispatch(setLocation(location));
    dispatch(filterLocations());
  };
};

export const setUsersLocation = (usersLocation) => ({
  type: SET_USERS_LOCATION,
  usersLocation
});

export const userLocationFailed = () => ({
  type: USER_LOCATION_FAILED
})

export const filterLocations = () => ({
  type: FILTER_LOCATIONS
});

export function getUsersLocation(cb) {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = {
          latitude,
          longitude
        };

        dispatch(setMapLocation({
          ...userLocation,
          latitudeDelta:0.1,
          longitudeDelta:0.1
        })
        );

        dispatch(setUsersLocation(userLocation));
        cb && cb(userLocation);
      },
      (error) => {
        dispatch(userLocationFailed())
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
        let data = raw.slice();
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

export function getDirectionsToWinery(to, from) {
  return (dispatch) => {
    if (!to) {
      console.error("no winery location");
    }
    if (from) {
      getDirections(formatDirectionAttributes(to, from));
    } else {
      dispatch(getUsersLocation((newFrom) => {
        const directions = formatDirectionAttributes(to, newFrom);
        getDirections(directions);
      }));
    }
  };
}

const formatDirectionAttributes = (to, from) => ({
  source: from,
  destination: to,
  params: [
    {
      key: "dirflg",
      value: "w"
    }
  ]
});

