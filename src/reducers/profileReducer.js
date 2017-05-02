import{
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  LOGOUT
} from '../constants';

const defaultData = {
  isFetching: false,
  avatarSrc: null, 
  profileFirstName: null, 
  profileLastName: null,
  username: null,
  userId: null
};

const translateProfileResponse = raw => ({
  avatarSrc: raw.avatar_url,
  // do we need these?
  profileFirstName: raw.first_name || (raw.billing && raw.billing.first_name) || null,
  profileLastName: raw.last_name || (raw.billing && raw.billing.last_name) || null,
  username: raw.username,
  userId: raw.id
});

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
  case LOGOUT:
   return defaultData;
  default:
    return state;
  }
}
