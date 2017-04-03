import { addNavigationHelpers, StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator(AppRouteConfigs);

export const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};