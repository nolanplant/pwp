import { NavigationActions } from "react-navigation";
import { OPEN_DRAWER, CLOSE_DRAWER } from "../constants";

export const closeDrawer = () => ({
  type: CLOSE_DRAWER
});

export const openDrawer = () => ({
  type: OPEN_DRAWER
});

export function goToLoginPage() {
  return dispatch => {
    dispatch(closeDrawer());
    setTimeout(() => {
      dispatch(NavigationActions.navigate({ routeName: "Profile" }));
    }, 100);
  };
}
