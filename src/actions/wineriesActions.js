import { 
  GET,
  REQUESTING_WINERIES,
  RECEIVING_WINERIES, 
  SET_WINERY_END_PAGE,
  SET_WINERY_PAGE_LENGTH,
  SET_WINERY_CURRENT_PAGE,
  SET_WINE_REGION_DETAILS
} from '../constants';
import { getSubRoute } from '../../utils'

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
    item.title = item.title ? item.title.rendered : (item.slug || Strings.WINERY);
    const reg = /data-medium-file=\"(.*?)\"/g;
    const srcRaw = reg.exec(item.content.rendered);
    let src;
    // todo: clean this up
    if (srcRaw && srcRaw.length === 2) {
      src = srcRaw[1];
    } else {
      const reg2 = /\ssrc=\"(.*?)\"/g;
      const srcRaw2 = reg2.exec(item.content.rendered);
      src = srcRaw2 && srcRaw2.length === 2 ? srcRaw2[1] : "";
    }
    item.thumb = src;
    // this is gross clean this up (possible use html parsing library or cleanerer regex)
    let cleaned = item.maplist_description.replace(/<\/ul>/g, "");
    cleaned = cleaned.replace(/<ul>/g, "");
    cleaned = cleaned.replace(/<li>/g, "");
    cleaned = cleaned.replace(/<\/li>/g, "");
    cleaned = cleaned.replace(/<i>/g, "");
    cleaned = cleaned.replace(/<\/i>/g, "");
    cleaned = cleaned.replace(/<b>/g, "");
    cleaned = cleaned.replace(/<\/b>/g, "");
    cleaned = cleaned.replace(/<br\/>/g, "");
    cleaned = cleaned.replace(/<br\s\/>/g, "");
    item.description = cleaned.trim();
    item.address = item.maplist_address;
    return item;
  });
  return cleanData;
};

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