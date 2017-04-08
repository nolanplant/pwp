import {BASE_ROUTE, AUTH_ROUTE, WOO_ROUTE } from '../constants';
export const hashToQueryString = (queryItems) => {
  queryItems = queryItems || {};
  let queryStr = Object.keys(queryItems).reduce((acc, value)=>{
     acc.push(`${value}=${queryItems[value]}`);
     return acc;
  }, []).join('&');
  return queryStr.length ? `?${queryStr}` : '';
}


export const getSubRoute = (subroute, params) => `${BASE_ROUTE}/${subroute}${hashToQueryString(params)}`;
export const getAuthRoute = (params) => `${AUTH_ROUTE}${hashToQueryString(params)}`;
export const getWooRoute = (subroute, params) => `${WOO_ROUTE}/${subroute}${hashToQueryString(params)}`;
