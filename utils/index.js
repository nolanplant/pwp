 import he from "he";
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
export const getWineryRoute = id => `${BASE_ROUTE}/maplists/${id}`;

export const translateData = (data) => data.map((item) => {
  const cleaned = item.maplist_description.replace(/<[^>]*>/g, "").trim();
  const images = getImagesSrcs(item.content.rendered, 10);
  return {
    ...item,
    title: item.title ? he.decode(item.title.rendered) : Strings.WINERY,
    address: he.decode(item.maplist_address),
    description: he.decode(cleaned),
    thumb: images[0],
    images
  };
 });

 const getImagesSrcs = (str, maxImages) => {
   const imagesSrcs = [];
   const srcReg = /data-medium-file=\"(.*?)\"/g;
   for (let i = 0, match = srcReg.exec(str); i < maxImages && match !== null; i++) {
     imagesSrcs.push(match[1]);
     match = srcReg.exec(str);
   }
   return imagesSrcs;
 };

