import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import homeReducer from "./homeReducer";
import mapReducer from "./mapReducer";
import navReducer from "./navReducer";
import wineriesReducer from "./wineriesReducer";

const rootReducer = combineReducers({
  loginReducer,
  mapReducer,
  homeReducer,
  navReducer,
  wineriesReducer
});

export default rootReducer;
