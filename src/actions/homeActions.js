import { TOGGLE_DRAWER } from '../../constants';
import { NavigationActions } from 'react-navigation';

export const toggleDrawer = ()=>{
  return {
    type: TOGGLE_DRAWER
  }
}

export function goToLoginPage(){
  return dispatch => {
    dispatch(toggleDrawer())
    setTimeout(()=>{
        dispatch(NavigationActions.navigate({routeName:'Profile'}))
    }, 100)
  }
}