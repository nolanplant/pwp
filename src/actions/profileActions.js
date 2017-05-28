import { getWooRoute, getOrdersRoute } from "../../utils";
import{REQUEST_PROFILE,
RECEIVE_PROFILE} from '../constants';
import WooCommerceAPI from '../../utils/WooCommerceAPI';

const requestProfile = () => ({
  type:REQUEST_PROFILE
});

const receiveProfile = (profileRaw) => ({
  type: RECEIVE_PROFILE,
  profileRaw
});

const getHeaders = (token)=> ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export const getUserProfile = () => {
  return (dispatch, getState) => {
    dispatch(requestProfile)
    const state = getState();
    const { token, email } = state.loginReducer;
    WooCommerceAPI.get('customers', {email})
      .then((response) => {
       dispatch(receiveProfile(response));   
    });
  }
}

export const getUserOrders = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { token, email } = state.loginReducer;
    const { userId } = state.profileReducer;
    const headers = getHeaders(token);
    const ordersPath = getWooRoute(`orders`, {
      customer: userId
    })
    fetch(ordersPath, {
      ...headers,
      method: "GET"
    })
    .then(data => data.json())
    .then((response)=>{
      debugger
    })
  }
}

