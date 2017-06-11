import React from "react";
import AppBase from "./containers/AppBase";
import { Provider } from "react-redux";
import getStore from "./store";
import { fetchWineLocations } from "./actions/mapActions";

const store = getStore();
store.dispatch(fetchWineLocations());

export default PriorityWinePass = () => (
  <Provider store={store}>
      <AppBase />
  </Provider>
);

