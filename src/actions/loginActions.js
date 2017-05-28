import { AsyncStorage } from "react-native";
import {
  REQUEST_LOGIN,
  RECEIVE_TOKEN,
  INVALID_LOGIN,
  LOGOUT,
  PWP_JWT_KEY,
  TOKEN_STORED,
  TOKEN_NOT_STORED,
  TOKEN_REMOVED } from "../constants";
import { getAuthRoute } from "../../utils";
import { getUserProfile } from './profileActions';

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function receiveLogin(response) {
  return {
    type: RECEIVE_TOKEN,
    ...response
  };
}

function invalidLogin() {
  return {
    type: INVALID_LOGIN
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function tokenRemoved() {
  return {
    type: TOKEN_REMOVED
  };
}

function tokenStored() {
  return {
    type: TOKEN_STORED
  };
}

function tokenNotStored() {
  return {
    type: TOKEN_NOT_STORED
  };
}


function translateResponse(response) {
  const {
    user_email: email,
    user_display_name: displayName,
    token
  } = response;
  return {
    email,
    displayName,
    token
  };
}

function storeUserToken(token) {
  return AsyncStorage.setItem(PWP_JWT_KEY, JSON.stringify(token));
}

function revokeUserToken() {
  return AsyncStorage.removeItem(PWP_JWT_KEY);
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout());
    revokeUserToken().then(() => {
      dispatch(tokenRemoved());
    });
  };
}

export function loginUser(params) {
  return dispatch => {
    dispatch(requestLogin());
    const { username, password } = params;
    const path = getAuthRoute();
    return fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        username
      })
    }).then((data) => data.json())
    .then((response) => {
      if (response.token) {
        dispatch(receiveLogin(translateResponse(response)));
       
        // todo: handle unable to store case
        storeUserToken(response).then(() => {
          dispatch(tokenStored());
        }).catch((e) => {
          console.error("something when wrong with storgae", e);
          dispatch(tokenNotStored());
        });

      } else {
        dispatch(dispatch(invalidLogin()));
      }
    }).catch((e) => {
      dispatch(dispatch(invalidLogin()));
      console.error("something went wrong with login", e);
    });
  };
}


