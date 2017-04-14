import AppTabs from "../containers/AppTabs";

export default function navReducer(state, action) {
  const newState = AppTabs.router.getStateForAction(action, state);
  return newState || state;
}
