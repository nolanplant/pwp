import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const getStore = () => {
  return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
};

export default getStore;
