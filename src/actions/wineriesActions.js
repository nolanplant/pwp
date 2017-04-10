 import {
  GET,
  REQUESTING_WINERIES,
  RECEIVING_WINERIES,
  SET_WINERY_END_PAGE,
  RECEIVE_WINERY_DATA,
  SET_WINERY_PAGE_LENGTH,
  SET_WINERY_CURRENT_PAGE,
  SET_WINE_REGION_DETAILS
} from "../constants";
 import { getSubRoute, translateData, getWineryRoute } from "../../utils";

 export const setWineRegionDetails = ({ wineRegionId, title }) => ({
   type: SET_WINE_REGION_DETAILS,
   wineRegionTitle: title,
   wineRegionId,
 });

 const requestingWineries = () => ({
   type: REQUESTING_WINERIES
 });

 const receivingWineries = (wineries) => ({
   type: RECEIVING_WINERIES,
   wineries
 });

 const setEndPage = (endPage) => ({
   type: SET_WINERY_END_PAGE,
   endPage
 });

 const setPageLength = (pageLength) => ({
   type: SET_WINERY_PAGE_LENGTH,
   pageLength
 });

 const setCurrentPage = (currentPage) => ({
   type: SET_WINERY_CURRENT_PAGE,
   currentPage
 });

const receiveWineryData = (currentWinery) => ({
  type: RECEIVE_WINERY_DATA,
  currentWinery
});

 export function fetchWineries() {
   return (dispatch, getState) => {
     const { wineriesReducer } = getState();
     const { currentPage, pageLength, endPage, wineRegionId } = wineriesReducer;
     if (!endPage || currentPage < endPage) {
       const path = getSubRoute("maplists", {
         map_location_categories: wineRegionId,
         page: currentPage
       });
       dispatch(requestingWineries());
       return fetch(path, {
         method: GET
       }).then((data) => data.json())
        .then((data) => {
          const cleaned = translateData(data);
          if (currentPage === 1) {
            dispatch(setPageLength(cleaned.length));
          }
          // set end page when we get a shorter response
          // keep track of this bc we dont know end page from Server yet
          if (cleaned.length < pageLength) {
            dispatch(setEndPage(currentPage));
          }
          dispatch(receivingWineries(cleaned));
          dispatch(setCurrentPage(currentPage + 1));
          return;
        });
     }
   };
 }

export function fetchMoreWineryDetails(id){
  return (dispatch) => {
    //clear data before fetching
    dispatch(receiveWineryData(null));
    const path = getWineryRoute(id);
    return fetch(path, {
      method: GET
    })
    .then((response) => response.json())
    .then(data => dispatch(receiveWineryData(data)));
  }
}