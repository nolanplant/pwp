import { getWooRoute, getOrdersRoute } from "../../utils";
import { REQUEST_PROFILE,
RECEIVE_PROFILE,
RECEIVE_ORDERS } from "../constants";
import WooCommerceAPI from "../../utils/WooCommerceAPI";
import {Linking} from 'react-native';
import {hashToQueryString} from '../../utils';

const requestProfile = () => ({
  type: REQUEST_PROFILE
});

const receiveProfile = (profileRaw) => {
  debugger
  return ({
  type: RECEIVE_PROFILE,
  profileRaw
})
};

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

export const getOrderByNumber = ({orderItemId, orderKey}) => {
  return (dispatch, getState) => {
      const state = getState();
      const { email } = state.loginReducer;
      const queryString = hashToQueryString({
        download_file: 8,
        order: orderKey,
        email,
        key:'woo_vou_pdf_1',
        item_id: orderItemId
      })
      Linking.openURL(`https://www.prioritywinepass.com/${queryString}`)
  }
}

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
    const { email } = state.loginReducer;
    WooCommerceAPI.get("customers", { email })
      .then((response) => {
        dispatch(receiveProfile(response));
        dispatch(getUserOrders());
      });
  };
};

//wc_order_59087bd37fb76
// https://www.prioritywinepass.com/?download_file=8
// &order=wc_order_59175c4e7c316&email=nplant%40sproutloud.com
// &key=woo_vou_pdf_1&item_id=23341

// https://www.prioritywinepass.com/?download_file=8
// &order=wc_order_59087bd37fb76
// &email=morgantheplant%40gmail.com&key=woo_vou_pdf_1&item_id=22865
