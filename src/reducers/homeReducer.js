import { CLOSE_DRAWER,
OPEN_DRAWER } from "../constants";
const defaultData = {
  isDrawerOpen: false
};

export default function homeReducer(state = defaultData, action) {
  switch (action.type) {
  case OPEN_DRAWER:
    return {
      ...state,
      isDrawerOpen: true
    };
  case CLOSE_DRAWER:
    return {
      ...state,
      isDrawerOpen: false
    };
  default:
    return state;
  }
}
