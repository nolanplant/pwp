import { TOGGLE_DRAWER } from '../../constants';
const defaultData = {
  isDrawerOpen: false
}

export function homeReducer(state = defaultData, action) {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
              ...state,
              isDrawerOpen: !state.isDrawerOpen
            }
        default:
            return state;
    }
}