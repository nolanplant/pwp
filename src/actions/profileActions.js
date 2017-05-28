import { getWooRoute, getOrdersRoute } from "../../utils";
import { REQUEST_PROFILE,
RECEIVE_PROFILE,
RECEIVE_ORDERS } from "../constants";
import WooCommerceAPI from "../../utils/WooCommerceAPI";

const requestProfile = () => ({
  type: REQUEST_PROFILE
});

const receiveProfile = (profileRaw) => ({
  type: RECEIVE_PROFILE,
  profileRaw
});

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const receiveOrders = (orders) => ({
  type: RECEIVE_ORDERS,
  orders
});

export const getUserOrders = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { userId } = state.profileReducer;
    WooCommerceAPI.get("orders", {
      customer: userId
    }).then((response) => {
      dispatch(receiveOrders(response));
    });
  };
};

export const getUserProfile = () => {
  return (dispatch, getState) => {
    dispatch(requestProfile);
    const state = getState();
    const { token, email } = state.loginReducer;
    WooCommerceAPI.get("customers", { email })
      .then((response) => {
        dispatch(receiveProfile(response));
        dispatch(getUserOrders());
      });
  };
};

