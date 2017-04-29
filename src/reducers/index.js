import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import homeReducer from "./homeReducer";
import mapReducer from "./mapReducer";
import navReducer from "./navReducer";
import wineriesReducer from "./wineriesReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  loginReducer,
  mapReducer,
  homeReducer,
  navReducer,
  wineriesReducer,
  profileReducer
});

export default rootReducer;
