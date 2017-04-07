import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import homeReducer from "./homeReducer";
import mapReducer from "./mapReducer";
import navReducer from "./navReducer";

const rootReducer = combineReducers({
  loginReducer,
  mapReducer,
  homeReducer,
  navReducer
});

export default rootReducer;
