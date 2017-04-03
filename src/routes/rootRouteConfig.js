import HomeScreen from '../components/HomeScreen';
import WineMap from '../components/WineMap';
import Profile from '../components/Profile';

export const rootNavigatorConfig = {
  initialRouteName: 'Home'
}

export default const rootRouteConfig = {
  // For each screen that you can navigate to, create a new entry like this:
  Home: {

    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: HomeScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'home',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    // navigationOptions: {
    //   title: ({state}) => `${state.params.username}'s Profile'`,
    // },
  },

  WineMap: {
    screen: WineMap,
    path: 'wine_map'
  },

  Profile: {
    screen: Profile,
    path: 'profile'
  }

}