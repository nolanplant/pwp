import { getWooRoute } from "../../utils";
import{REQUEST_PROFILE,
RECEIVE_PROFILE} from '../constants';

const requestProfile = () => ({
  type:REQUEST_PROFILE
});

const receiveProfile = (profileRaw) => ({
  type: RECEIVE_PROFILE,
  profileRaw
});

export const getUserProfile = () => {
  return (dispatch, getState) => {
    dispatch(requestProfile)
    const state = getState();
    const { token, email } = state.loginReducer;
    const myOrdersPath = getWooRoute(`customers`, {
      email,
      role:'all' //todo remove this after testing
    });
    fetch(myOrdersPath, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((response) => {
      dispatch(receiveProfile(response));  
    });
  }
}

