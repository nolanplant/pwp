import he from "he";
import Strings from '../constants/Strings';
import {BASE_ROUTE, AUTH_ROUTE, WOO_ROUTE } from '../constants';
import { Linking, Platform } from 'react-native';

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
    images,
    latlng: {
      latitude: +item.maplist_latitude,
      longitude: +item.maplist_longitude
    }
  };
 });

 const getImagesSrcs = (str, maxImages) => {
   const imagesSrcs = [];
   const srcReg = /data-medium-file=\"(.*?)\"/g;
   for (let i = 0, match = srcReg.exec(str); i < maxImages && match !== null; i++) {
     imagesSrcs.push(match[1]);
     match = srcReg.exec(str);
   }
   if(!imagesSrcs.length){
    //last result just pull first src
    const srcBare = /src=\"(.*?)\"/g;
    const src = srcBare.exec(str);
    src && src[1] && imagesSrcs.push(src[1]); 
   }
   return imagesSrcs;
 };

export function debounce(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const boundsContains = (bounds, point) => (
(point.latitude >= bounds.sw.latitude) && 
(point.latitude <= bounds.ne.latitude) && 
(point.longitude >= bounds.sw.longitude) && 
(point.longitude <= bounds.ne.longitude)
);

export const getBounds = ({ longitude, latitude, longitudeDelta, latitudeDelta}, padding=.01) => ({
  sw: { 
    longitude: longitude - (longitudeDelta * (0.5 + padding)),
    latitude: latitude - (latitudeDelta * (0.5 + padding))
  },
  ne: {
    longitude: longitude + (longitudeDelta * (0.5 + padding)),
    latitude: latitude + (latitudeDelta * (0.5 + padding))
  }
});

export const callNumber = (number)=> {
  const prompt = Platform.OS !== 'android' ? 'prompt' : '';
  const numberLink = `tel${prompt}:${number}`;
  Linking.canOpenURL(numberLink).then(supported => {
    if(!supported) {
      console.log('Can\'t handle number: ' + numberLink);
    } else {
      Linking.openURL(numberLink)
      .catch(err => {
        // intentionally left blank if user cancels request
      });
    }
  }).catch(err => console.warn('An unexpected error happened', err));
};