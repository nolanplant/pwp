import { SET_DISPLAY_SIZE_TOOLBAR_STATE, SET_DISPLAY_SIZE } from '../constants';

export const setDisplayFontSize = (displayFontSize)=>({
  type: SET_DISPLAY_SIZE,
  displayFontSize
})

export const setFontSizeToolBarState = (isShowing)=>({
  type: SET_DISPLAY_SIZE_TOOLBAR_STATE,
  isShowing
})