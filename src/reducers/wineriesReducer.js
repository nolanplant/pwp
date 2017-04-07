import { 
  SET_WINERY_END_PAGE,
  SET_WINERY_PAGE_LENGTH,
  SET_WINERY_CURRENT_PAGE,
  REQUESTING_WINERIES,
  RECEIVING_WINERIES, 
  SET_WINE_REGION_DETAILS
} from '../constants';

const defaultData = {
  currentPage: 1,
  endPage: null,
  pageLength: null,
  wineries: [],
  isFetching: false,
  wineRegionId: null,
  winerRegionTitle: null
}

export default function wineriesReducer(state = defaultData, action) {
  switch (action.type) {
    case REQUESTING_WINERIES:
      return {
        ...state,
        isFetching: true
      };  
    case  RECEIVING_WINERIES:
      return {
        ...state,
        wineries: state.wineries.concat(action.wineries),
        isFetching: false
      };  
    case SET_WINERY_END_PAGE:
      return {
        ...state,
        endPage: action.endPage
      };
    case SET_WINERY_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    case SET_WINERY_PAGE_LENGTH: 
      return {
        ...state,
        pageLength: action.pageLength
      };
    case SET_WINE_REGION_DETAILS:
      return {
        ...state,
        wineRegionId: action.wineRegionId,
        winerRegionTitle: action.winerRegionTitle
      }       
    default:
      return state;
  }
}
