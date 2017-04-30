import {
  REQUEST_LOGIN,
  RECEIVE_TOKEN,
  INVALID_LOGIN,
  TOKEN_STORED,
  TOKEN_REMOVED,
  TOKEN_NOT_STORED,
  LOGOUT } from "../constants";

const defaultData = {
  // logging in states
  isLoggedIn: false,
  isLoggingIn: false,
  invalidLogin: false,
  // token details
  token: null,
  email: null,
  displayName: null,
  // token storage details
  tokenStored: false,
  tokenFailed: true
};

export default function loginReducer(state = defaultData, action) {
  switch (action.type) {
  case REQUEST_LOGIN:
    return {
      ...state,
      isLoggingIn: true,
      invalidLogin: false
    };
  case RECEIVE_TOKEN:
    const { token, email, displayName } = action;
    return {
      ...state,
      isLoggedIn: true,
      isLoggingIn: false,
      token,
      email,
      displayName
    };
  case INVALID_LOGIN:
    return {
      ...state,
      isLoggedIn: false,
      isLoggingIn: false,
      invalidLogin: true
    };
  case TOKEN_REMOVED:
    return {
      ...state,
      tokenStored: false,
      invalidLogin: false
    };
  case TOKEN_STORED:
    return {
      ...state,
      tokenStored: true,
      isLoggedIn: true,
      tokenFailed: false
    };
  case TOKEN_NOT_STORED:
    return {
      ...state,
      tokenStored: false,
      tokenFailed: true
    };
  case LOGOUT:
    return defaultData;
  default:
    return state;
  }
}
