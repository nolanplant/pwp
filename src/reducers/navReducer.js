import AppTabs from '../containers/AppTabs';

export const navReducer = (state, action) => {
  const newState = AppTabs.router.getStateForAction(action, state);
  return newState || state;
};