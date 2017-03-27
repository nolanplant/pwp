import {BASE_ROUTE, AUTH_ROUTE } from '../constants';
export const hashToQueryString = (queryItems) => {
  queryItems = queryItems || {};
  let queryStr = Object.keys(queryItems).reduce((acc, value)=>{
     acc.push(`${value}=${queryItems[value]}`);
     return acc;
  }, []).join('&');
  return queryStr.length ? `?${queryStr}` : '';
}


export const getSubRoute = (subroute, params) =>{
  return `${BASE_ROUTE}/${subroute}${hashToQueryString(params)}`;
}

export const getAuthRoute = (params) =>{
  return `${AUTH_ROUTE}${hashToQueryString(params)}`;
}
