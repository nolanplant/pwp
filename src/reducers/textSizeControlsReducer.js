import { SET_DISPLAY_SIZE_TOOLBAR_STATE, SET_DISPLAY_SIZE, SMALL_FONT } from '../constants';

const defaultData = {
  displayFontSize: SMALL_FONT,
  displaySizeToolbarIsShowing: false,
};

export default function homeReducer(state = defaultData, action) {
  switch (action.type) {
    case SET_DISPLAY_SIZE_TOOLBAR_STATE:
      return {
        ...state,
        displaySizeToolbarIsShowing: action.isShowing
      };
    case SET_DISPLAY_SIZE:
      return {
        ...state,
        displayFontSize: action.displayFontSize
      };
    default:
    return state;
  }
}
