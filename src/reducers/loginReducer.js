import { 
  REQUEST_LOGIN, 
  RECEIVE_TOKEN, 
  INVALID_LOGIN,
  TOKEN_STORED,
  TOKEN_REMOVED,
  TOKEN_NOT_STORED, 
  LOGOUT } from '../constants';

const defaultData = {
  // logging in states
  isLoggedIn: false,
  isLoggingIn: false,
  invalidLogin: false,
  // token details
  token: null,
  email: null,
  displayName: null,
  //token storage details
  tokenStored: false,
  tokenFailed: true
}

export function loginReducer(state = defaultData, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
        invalidLogin: false
      };
    case RECEIVE_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        token: action.token
      };
    case INVALID_LOGIN:
     return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        invalidLogin: true
      };
    case LOGOUT: 
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        invalidLogin: false,
        token: null
      };
    case TOKEN_REMOVED:
      return {
        ...state,
        tokenStored: false,
        invalidLogin: false
      };
    case TOKEN_STORED:
      return {
        tokenStored: true,
        isLoggedIn: true,
        tokenFailed: false
      }
    case TOKEN_NOT_STORED:
      return {
        tokenStored: false,
        tokenFailed: true
      }        
    default:
        return state;
    }
}