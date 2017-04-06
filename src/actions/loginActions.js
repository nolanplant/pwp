import { 
  REQUEST_LOGIN, 
  RECEIVE_TOKEN, 
  INVALID_LOGIN, 
  LOGOUT,
  POST,
  PWP_JWT_KEY,
  TOKEN_STORED,
  TOKEN_REMOVED } from '../constants';
import { getAuthRoute } from '../../utils';
import {AsyncStorage} from 'react-native';  


function requestLogin(){
  return {
    type: REQUEST_LOGIN
  }
}

function receiveLogin(response){
  return {
    type: RECEIVE_TOKEN,
    ...response
  }
}

function invalidLogin(){
  return {
    type: INVALID_LOGIN
  }
}

function logout(){
  return {
    type: LOGOUT
  }
}

function tokenRemoved(){
  return {
    type: TOKEN_REMOVED
  }
}

function tokenStored(){
  return {
    type: TOKEN_STORED
  }
}

function tokenNotStored(){
  return {
    type: TOKEN_NOT_STORED
  }
}



function translateResponse(response){
  const {
    user_email: email,
    user_display_name: displayName,
    token
  } = response;
  console.log('translated response', {
    email,
    displayName,
    token
  })
  return {
    email,
    displayName,
    token
  };
}

export function logoutUser(){
  return dispatch => {
    dispatch(logout());
    revokeUserToken().then(()=>{
      dispatch(tokenRemoved())
    });
  }
}

export function loginUser(params){
  return dispatch => {
    console.log('requesting login')
    dispatch(requestLogin());
    const {username, password} = params;
    const path = getAuthRoute();
    console.log('route is', path)
    return fetch(path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        password,
        username
      })
    }).then((data) => data.json())
    .then((response)=>{
      if(response.token){
        dispatch(receiveLogin(translateResponse(response)));
        //todo: handle unable to store case
        storeUserToken(response).then(()=>{
          dispatch(tokenStored());
        }).catch((e)=>{
          console.warn('something when wrong with storgae', e)
          dispatch(tokenNotStored());
        });
      } else {
        dispatch(dispatch(invalidLogin()));
      }
    }).catch((e)=>{
      console.warn('something went wrong with login', e)
      dispatch(dispatch(invalidLogin()));
    });
  }  
}

function storeUserToken(token){
  try {  
    return AsyncStorage.setItem(PWP_JWT_KEY, JSON.stringify(token))
  } catch (e){
    console.warn('Something went wrong with JWT Storage', e)
  }
}

function revokeUserToken(){
  try{
     return AsyncStorage.removeItem(PWP_JWT_KEY)
     console.log('removing the token')
  } catch (e) {
    console.warn('Something went wrong with JWT removal', e)
  }
}