import { NavigationActions } from "react-navigation";
import { TOGGLE_DRAWER } from "../../constants";

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
});

export function goToLoginPage() {
  return dispatch => {
    dispatch(toggleDrawer());
    setTimeout(() => {
      dispatch(NavigationActions.navigate({ routeName: "Profile" }));
    }, 100);
  };
}
