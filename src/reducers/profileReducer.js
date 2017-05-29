import moment from 'moment';
import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  RECEIVE_ORDERS,
  LOGOUT
} from "../constants";

const defaultData = {
  isFetching: false,
  avatarSrc: null,
  profileFirstName: null,
  profileLastName: null,
  username: null,
  address: null,
  userId: null,
  orders: []
};

const translateShipping = raw => `${raw.address_1}${raw.address_2 && raw.address_2.trim() ? ` ${raw.address_2}` : ""}, ${raw.city}, ${raw.state} ${raw.postcode}`;

const translateProfileResponse = raw => ({
  avatarSrc: raw.avatar_url,
  // do we need these?
  profileFirstName: raw.first_name || (raw.billing && raw.billing.first_name) || null,
  profileLastName: raw.last_name || (raw.billing && raw.billing.last_name) || null,
  username: raw.username,
  address: translateShipping(raw.shipping),
  userId: raw.id
});

const translateLineItemResponse = raw => raw.map((item) => ({
  orderDetail: item.name,
  orderItemId: item.id
}));

const translateOrderResponse = raw => raw.map(item => ({
  lineItems: translateLineItemResponse(item.line_items),
  orderNumber: item.number,
  orderKey: item.order_key,
  // note: this wont handle trans
  orderDate:moment(item.date_completed, "YYYY-MM-DD").format("MMMM Do, YYYY")
}))

export default function homeReducer(state = defaultData, action) {
  switch (action.type) {
  case REQUEST_PROFILE:
    return {
      ...state,
      isFetching: true
    };
  case RECEIVE_PROFILE:
    const profileData = translateProfileResponse(action.profileRaw[0]);
    return {
      ...state,
      ...profileData,
      isFetching: false
    };
  case RECEIVE_ORDERS:
    return {
      ...state,
      orders: translateOrderResponse(action.orders)
    };
  case LOGOUT:
    return defaultData;
  default:
    return state;
  }
}
