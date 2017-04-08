 import { 
  GET,
  REQUESTING_WINERIES,
  RECEIVING_WINERIES, 
  SET_WINERY_END_PAGE,
  SET_WINERY_PAGE_LENGTH,
  SET_WINERY_CURRENT_PAGE,
  SET_WINE_REGION_DETAILS
} from '../constants';
import { getSubRoute, parseHtmlEntities  } from '../../utils';
import he from 'he';

export const setWineRegionDetails = ({wineRegionId, title}) => ({
  type: SET_WINE_REGION_DETAILS,
  wineRegionTitle: title,
  wineRegionId,
})

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

const translateData = (data) => {
  const cleanData = data.map((item) => {
    item.title = item.title ? he.decode(item.title.rendered) : (item.slug || Strings.WINERY);
    item.images = getImagesSrcs(item.content.rendered, 6);
    item.thumb = item.images[0];
    // this is gross clean this up (possible use html parsing library or cleanerer regex)
    let cleaned = item.maplist_description.replace(/<[^>]*>/g, "").trim();
    item.description = he.decode(cleaned);
    item.address = he.decode(item.maplist_address);
    return item;
  });
  return cleanData;
};

const getImagesSrcs = (str, maxImages) => {
  const imagesSrcs = [];
  const srcReg = /data-medium-file=\"(.*?)\"/g;
  for (let i = 0, match = srcReg.exec(str); i < maxImages && match !== null; i++) {
    imagesSrcs.push(match[1]);
    match = srcReg.exec(str);
  }
  return imagesSrcs;
}

export function fetchWineries(){
  return (dispatch, getState) => {
    const { wineriesReducer } = getState()
    const { currentPage, pageLength, endPage, wineRegionId } = wineriesReducer;
    if(!endPage || currentPage < endPage){
      const path = getSubRoute("maplists", {
        map_location_categories: wineRegionId,
        page: currentPage
      });
      dispatch(requestingWineries())
      return fetch(path, {
          method: GET
        }).then((data) => data.json())
        .then((data) => {
          const cleaned = translateData(data);
          if (currentPage === 1) {
            dispatch(setPageLength(cleaned.length))         
          }
          // set end page when we get a shorter response
          // keep track of this bc we dont know end page from Server yet
          if (cleaned.length < pageLength) {
            dispatch(setEndPage(currentPage));
          }
          dispatch(receivingWineries(cleaned));
          dispatch(setCurrentPage(currentPage+1));
      });      
    }
  }
}